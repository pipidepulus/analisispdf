import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ProjectOverview = () => {
    return (
        <motion.div
            className="w-full max-w-[600px] my-4"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 5 }}
        >
            <div className="border rounded-lg p-6 flex flex-col gap-4 text-neutral-500 text-sm dark:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900">
                <p>
                    The{" "}
                    <Link
                        href="https://github.com/akshays-repo/OptiKnow"
                        className="text-blue-500"
                    >
                        OptiKnow
                    </Link>
                </p>
                <p>
                    This project enables employees to ask questions about company
                    policies, such as Vision, Mission, Values, Code of Conduct, Attendance
                    policies, and Leave management etc.. The chat interface delivers quick,
                    reliable answers based on the company policy database, empowering
                    employees with easy access to important HR information anytime.
                </p>
            </div>
        </motion.div>
    );
};

export default ProjectOverview;
