import FileUpload from "./fille-upload";

export default function UploadPage() {

    // redirect to home if not localhost 
    if (process.env.NODE_ENV !== 'development') {
        return <> File upload is only available in development mode </>;
    }

    return (
        <div className='px-12 my-12'>
            <div>
                <FileUpload />
            </div>
        </div>

    );
}
