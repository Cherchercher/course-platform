import { isAfter, parseISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import AWS from 'aws-sdk';
import { LESSONS_PATH } from 'utils/mdxUtils';
import { dict } from 'utils/dataTypes';
import { prisma } from '../../../lib/prisma';

interface Request extends NextApiRequest {
  query: {
    lesson: string;
  };
}


export interface LessonResponse {
  source: MDXRemoteSerializeResult<Record<string, unknown>> | null;
  frontMatter: {
    [key: string]: any | null;
  };
  mediaData:  any | null;
}
interface Response extends NextApiResponse {
  send(params: LessonResponse): any;
}
const handler = async (req: Request, res: Response) => {
  try {
    const session = await getSession({ req });
    const isSessionExpired = session?.expires
      ? isAfter(new Date(), parseISO(session.expires))
      : true;

    const email = session?.user?.email;

    const isPaidUser = email
      ? await prisma.user.findUnique({
          where: { email },
        })
      : false;

      console.log(req.query);
    const postFilePath = path.join(LESSONS_PATH, `design-for-developers-fundamentals.mdx`);
    const source = fs.readFileSync(postFilePath);

    //read from s3
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY
      }
    });
  
    // The id from the route (e.g. /img/abc123987)
    // let filename = query.id;
    //bucket is the "course"_ + cousename nomadichacker
    //key is the section_number_part_number
  
    const bucket = req?.query?.lesson;

    const listDirectories = (Bucket) => {
      return new Promise ((resolve, reject) => {
        const s3params = {
          Bucket,
          Delimiter: '/',
        };
        s3.listObjectsV2 (s3params, (err, data) => {
          if (err) {
            reject (err);
          }
          resolve (data);
        });
      });
    };

    const result = await listDirectories(bucket);

    const listParts = (Bucket, Prefix) => {
      return new Promise ((resolve, reject) => {
        const s3params = {
          Bucket: Bucket,
          Delimiter: '/',
          Prefix
        };
        s3.listObjectsV2 (s3params, (err, data) => {
          if (err) {
            reject (err);
          }
          resolve (data);
        });
      });
    };

  let mediaData = Array(result.CommonPrefixes.length).fill({"name": "", "parts": []});


    const getSignedUrl = function(key, bucket) {
      return new Promise((resolve, reject) => {
        s3.getSignedUrl("getObject", {
          Bucket: bucket,
          Key: key
        }, (err, data) => {
          if (err) reject(err);
          resolve(data     
            );
        });
      });
    }


  
    await Promise.all(
      result.CommonPrefixes.map(async (section, i) => {
        const parts = await listParts(bucket, section.Prefix);
        await Promise.all(parts.Contents.map(async (part, j) => {
        const keys = part.Key.split("/");
          if (keys.length > 1) {
            const [ partName, partType ] = keys[1].split(".");
            if (partName != '') {
              const partUrl = await getSignedUrl(part.Key, bucket);
              mediaData[i]["parts"].push({partName, partType, partUrl});
              mediaData[i]["name"] = keys[0];
            }
          }
      }))
    }));

    const { content, data } = matter(source);

    if (!isPaidUser || isSessionExpired) {
      return res.send({
        source: null,
        frontMatter: data,
        mediaData: null,
      });
     
    }
    //display necessary mesage

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: data,
    });

    console.log("media data is", mediaData)

    res.send({
      source: mdxSource,
      frontMatter: data,
      mediaData
    });
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't found this Lesson!");
  }
};
export default handler;
