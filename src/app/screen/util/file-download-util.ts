import { saveAs } from 'file-saver';

export const saveFile = (blobContent: Blob, fileName: string, type: string) => {
    const blob = new Blob([blobContent], { type });
    saveAs(blob, fileName);
};

// export const getFileNameFromResponseContentDisposition = (res : any) => {
//     let matches : any;
//     const contentDisposition = res.headers.get('content-disposition') || '';
//     matches = /filename=([^;]+)/ig.exec(contentDisposition);
//     const fileName = (matches[1] || 'untitled').trim();
//     return fileName;
// };

export const getContentTypeFromResponse = (res:any) => {
    return res.headers.get('content-type') || '';
};