import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

export const downloadProjectAsset = async (
  assetId,
  assetType,
  setMessage,
  setSnackbarState,
  setSeverity,
  setDownloadDocument
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROJECTS.DOWNLOAD_PROJECT_ASSET}/${assetId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
        },
        responseType: "blob",
      }
    );

    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });

      // Create a temporary link element
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", assetType);

      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);

      setMessage("Download completed successfully");
      setSnackbarState(true);
      setSeverity("success");

      setDownloadDocument(false);
    }

    return response;
  } catch (error) {
    setMessage(error.response?.data?.message);
    setSnackbarState(true);
    setSeverity("error");
    return error.response;
  }
};
