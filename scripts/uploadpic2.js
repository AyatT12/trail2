document.getElementById("Doc2-modal-button").addEventListener('click', function (event) {
    const systemsCheck2 = document.querySelector('.systems-check2');
    const IDuploadContainer2 = document.querySelector(".Doc2-upload-container");
    const IDmainContainer2 = document.querySelector(".Doc2-main-container");
    const UploadPic2 = document.getElementById("UploadPic2");
    const IDimageUpload2 = document.getElementById("Doc2imageUpload");
    const openCameraButton2 = document.getElementById('openCamera2');
    let saveIDBtn2 = null;
    var imgeURL2;
    let videoElement2 = null;
    let photo2 = null;
    let stream = null;

    // Function to update systems-check background
    function updateSystemsCheckBackground() {
        if (IDuploadContainer2.querySelector("img")) {
            systemsCheck2.style.backgroundColor = "green";
        } else {
            systemsCheck2.style.backgroundColor = ""; // Reset background if no image
        }
    }

    // Check if there's already an image on page load
    document.addEventListener("DOMContentLoaded", function () {
        updateSystemsCheckBackground(); // Update on page load
    });

    // Image Upload
    UploadPic2.addEventListener("click", function () {
        IDimageUpload2.click();
        saveIDBtn2 = "UploadPic2";
    });

    IDimageUpload2.addEventListener("change", function () {
        const file = IDimageUpload2.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const IDimageURL = e.target.result;
                const IDpreviewImage = document.createElement("img");
                IDpreviewImage.classList.add("preview-image");
                IDpreviewImage.src = IDimageURL;
                IDpreviewImage.id = "IDImage2";
                imgeURL2 = IDimageURL;
                IDmainContainer2.innerHTML = '<i class="fa-regular fa-circle-xmark xmark-icon"></i>';
                IDuploadContainer2.innerHTML = "";
                IDuploadContainer2.appendChild(IDpreviewImage);
                IDuploadContainer2.classList.add("previewing");
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove Image
    document.getElementById("removeIDImg2").addEventListener("click", function (event) {
        event.preventDefault();
        saveIDBtn2 = null;
        if (IDuploadContainer2.firstChild) {
            IDuploadContainer2.innerHTML = "";
            IDmainContainer2.innerHTML = "";
            IDuploadContainer2.classList.remove("previewing");
        }
    });

    // Function to start the camera
    async function startCamera() {
        if (!videoElement2) {
            IDuploadContainer2.innerHTML = `
                <video id="videoElement2" autoplay></video>
                <img id="photo2" alt="The screen capture will appear in this box." style="display:none;">
            `;

            videoElement2 = document.getElementById('videoElement2');
            photo2 = document.getElementById('photo2');

            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoElement2.srcObject = stream;

                await new Promise(resolve => {
                    videoElement2.onloadedmetadata = () => {
                        resolve();
                    };
                });

            } catch (error) {
                console.error('Error accessing the camera:', error);
            }
        }
    }

    function capturePhoto() {
        const canvasElement = document.createElement('canvas');
        canvasElement.width = videoElement2.videoWidth;
        canvasElement.height = videoElement2.videoHeight;
        const context = canvasElement.getContext('2d');
        context.drawImage(videoElement2, 0, 0, canvasElement.width, canvasElement.height);
    
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    
        const dataUrl = canvasElement.toDataURL('image/png');
        photo2.src = dataUrl;
        photo2.style.display = 'block';
        videoElement2.remove();
        videoElement2 = null; // Reset video element for future camera openings
    
        // Clear existing content in IDuploadContainer2 before appending the new photo
        IDuploadContainer2.innerHTML = `
            <i class="fa-regular fa-circle-xmark xmark-icon" id="removePhoto2"></i>
        `;
        IDuploadContainer2.appendChild(photo2);
    
        // Add event listener to remove the captured photo when X mark is clicked
        document.getElementById("removePhoto2").addEventListener("click", function () {
            IDuploadContainer2.innerHTML = "";
            IDuploadContainer2.classList.remove("previewing");
            systemsCheck2.style.backgroundColor = ""; // Reset background color
        });
    }
    
    // Camera Capture
    openCameraButton2.addEventListener('click', () => {
        if (!videoElement2) {
            startCamera();
        } else {
            capturePhoto();
        }
    });

    // Save the uploaded ID photo2 image
    function SaveUplodedIDphoto2() {
        const img = document.getElementById("IDImage2");
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/png");
        console.log(base64);
        $("#Doc2-photo-modal").modal("hide");
    }

    // Save the camera ID photo2 image
    function SaveCameraIDphoto2() {
        const img = document.getElementById("photo2");
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/png");
        console.log(base64);
        $("#Doc2-photo-modal").modal("hide");
    }

    document.getElementById("Doc2-photo-save").addEventListener("click", function () {
        if (saveIDBtn2 === "UploadPic2") {
            SaveUplodedIDphoto2();
        } else if (saveIDBtn2 === "CameraID2") {
            SaveCameraIDphoto2();
        } else {
            $("#Doc2-photo-modal").modal("hide");
        }
        // Update systems-check background after saving the image
        updateSystemsCheckBackground();
    });
});
