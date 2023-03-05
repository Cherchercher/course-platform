import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { lessonFilePaths, LESSONS_PATH } from 'utils/mdxUtils';
import { fetcher } from 'utils/SWRFetcher';
import useSWR from 'swr';
import { GetStaticProps } from 'next';

interface Props {
  lessons: {
    content: string;
    data: {
      [key: string]: any;
    };
    filePath: string;
  }[];
}

const Lessons = ({ lessons }: Props) => {
  const { data, error } = useSWR<LessonResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons`,
    fetcher,
  );

  console.log("data is");

  console.log(data);

  return (
    <div className="prose mx-auto my-24">
      {data?.purchased && (
      <div className="w-full">
        <h1>Lessons You Purchased</h1>

      <div className="w-full">
        {data?.purchased.map((lesson) => (
          <Link
            as={`/course/${lesson.courseBucket}/1`}
            href={`/course/[lesson]/[section]`}
          >
          <div className='cursor-pointer flex'>        
            <img className='h-48 w-auto flex-1' src='/images/nomadicCourse.png' />
            <div className='flex-3 m-8'>
              <span className='text-xl font-bold'>
              {lesson.name}
              </span>
              <p className='text-l flex-3'>
              {lesson.description}
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
      </div>)
  }

  {data?.others && data?.others.length > 0 && (
      <div><h1>All Lessons</h1>

      <ol className="grid grid-cols-1 md:grid-cols-2">
        {data?.others.map((lesson) => (
          <li key={lesson.courseBucket}>
            <Link
              as={`/course/${lesson.courseBucket}/1`}
              href={`/course/[lesson]/[section]`}
            >
              <a>{lesson.name}</a>
            </Link>
          </li>
        ))}
      </ol>
      </div>)
  }
    </div>
  );
};

export default Lessons;

export const getStaticProps: GetStaticProps = async () => {
  const lessons = lessonFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(LESSONS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { lessons } };
};
