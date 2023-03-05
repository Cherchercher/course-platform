import Link from 'next/link';
import React from 'react';

const CourseParts = (props) => {
    let { courseId, parts, active, lesson,  ...rest } = props;
    return (
        <div>
        {active && parts?.map((part)=>(
            <li className={`m-0 border-x-2 border-t-2 p-0 ${active? 'block': 'hidden'}`} key={part.partName}>
                <Link href={`/course/${lesson}/${part.partName}`}>
                    <a
                        className={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer`}
                    >
                        {part.partName} <br/>
                        {part.partType} - {part.duration}
                    </a>
                </Link>
          </li>)
          )}
          </div >
    )
}
export default CourseParts