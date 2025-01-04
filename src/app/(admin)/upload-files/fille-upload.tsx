"use client";

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

export default function FileUpload() {
    return (
        <div className='px-12 my-12'>
            <div>
                <FilePond
                    server={{
                        process: '/api/upload',
                        fetch: null,
                        revert: null,
                    }}
                    acceptedFileTypes={['application/pdf']}
                    allowMultiple={false}
                    maxFiles={1}
                    labelIdle="Drag & Drop your files here or click to select files"
                    labelFileWaitingForSize="Waiting for file size"
                    instantUpload={false}
                    allowRevert={false}

                />
            </div>

        </div>

    );
}
