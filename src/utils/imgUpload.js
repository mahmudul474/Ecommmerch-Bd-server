import axios from "axios";
import { toast } from "react-toastify";

const uploadImages = async (fieldName, files) => {
  const loadingToastId = toast.loading(`Uploading ${fieldName}...`, {
    delay: 500
  });
  try {
    const imagesList = new FormData();
    for (const file of files) {
      imagesList.append(fieldName, file)
    }

    const upload = await axios.post('https://api.dreamfurniturebd.com/api/v1/files/upload', imagesList)

    toast.update(loadingToastId, {
      render: `${fieldName} Uploaded successfully`,
      type: "success",
      isLoading: false,
      autoClose: 600,
    });

    // console.log(upload.data);
    let urls = [];
    upload?.data?.data?.map(each => {
      if (each.fieldName === fieldName) {
        for (const file of each.files) {
          urls.push(file.url)
        }
      }
    })
    return urls;
  } catch (error) {
    toast.dismiss(loadingToastId)
    toast.error(error?.response?.data?.message || error?.message, {
      toastId: fieldName + "-error", // Use a unique toastId for error Toast
      autoClose: 3000
    });
  }
}

export default uploadImages