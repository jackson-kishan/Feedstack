import { StatusType, TopicType } from "@/types";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

type Props = {
    statuses: StatusType[];
    topics: TopicType[];
}

const SideNav = ({statuses, topics}: Props) => {


    return (
  <>
               <aside className="w-1/5 p-3 border-r">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">Statuses</h2>
                        <ul className="mx-4 my-2 space-y-2">

                            {statuses.map((status) => (
                              <Link
                                key={status.id}
                                href={`?status=${status.name}`}
                                >
                              <li className="flex my-2 items-center space-x-2">
                              <span className="inline-block w-2 h-2 rounded-full"
                                   style={{ background: status.color }} />
                              <span>{status.name}</span>
                               </li>
                               </Link>
                            ))}
                        </ul>
                    </div>

                    <div className="">
                        <h2 className="text-lg font-semibold">Topics</h2>
                        <ul className="mx-4 space-y-2">
                            {topics.map((topic) => (
                               <Link
                                 key={topic.id}
                                 href={`?topic=${topic.name}`}
                               >
                              <li  className="flex my-2 items-center space-x-2">
                              <span>{topic.name}</span>
                              <span role="image" aria-label="wave">
                                  👋
                              </span>
                          </li>
                          </Link>
                            ))}
                        </ul>
                    </div>
                </aside>

  </>
  );
};

export default SideNav;
