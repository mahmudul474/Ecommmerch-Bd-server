import axios from "axios";

const uploadImages = async (fieldName, files) => {
    const imagesList = new FormData();
    for (const file of files) {
        imagesList.append(fieldName, file)
    }
    const upload = await axios.post('http://localhost:9000/api/v1/files/upload', imagesList)
    console.log(upload.data);
    let urls = [];
    upload?.data?.data?.map(each => {
      if (each.fieldName === fieldName) {
        for (const file of each.files) {
          urls.push(file.url)
        }
      }
    })
    return urls;
}

export default uploadImages