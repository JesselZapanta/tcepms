import React from 'react'

export default function Test() {
    //for contractor_accreditation upload 

    const [isAccreditationUpload, setIsAccreditationUpload] = useState(false);

    const removeAccreditation = (accreditation) => {
        axios.post(`/staffone/accreditation-temp-remove/${accreditation}`).then((res) => {
            if (res.data.status === "remove") {
                message.success("Contractor accreditation removed.");
                setIsAccreditationUpload(false);
            }
            if (res.data.status === "error") {
                alert("error");
            }
        });
    };

    const accreditationUploadprops = {
        name: "contractor_accreditation",
        action: "/staffone/accreditation-temp-upload",
        headers: {
            "X-CSRF-Token": csrfToken,
        },

        beforeUpload: (file) => {
            if (isAccreditationUpload) {
                message.error(
                    "You cannot upload a new contractor accreditation while one is already uploaded."
                );
                return Upload.LIST_IGNORE;
            }

            const isPDF = file.type === "application/pdf";

            if (!isPDF) {
                message.error(`${file.name} is not a PDF file.`);
            }
            return isPDF || Upload.LIST_IGNORE;
        },

        onChange(info) {
            if (info.file.status === "done") {
                // Ensure the upload is complete
                if (project) {
                    axios
                        .post(
                            `/staffone/accreditation-replace/${project.id}/${project.contractor_accreditation}`
                        )
                        .then((res) => {
                            if (res.data.status === "replace") {
                                message.success("File Replaced");
                            }
                        });
                } else {
                    message.success(
                        "Contractor accreditation clearance uploaded successfully."
                    );
                    // setTempBuildingPermit(info.file.response);
                    setIsAccreditationUpload(true);
                }
            } else if (info.file.status === "error") {
                message.error(
                    "Contractor accreditation clearance upload failed."
                );
            }
        },

        onRemove(info) {
            // Prevent removal if user exists
            if (project) {
                message.error(
                    "You cannot remove the contractor accreditation clearance ."
                );
                return false; // Prevent file removal
            }

            removeAccreditation(info.response);
            return true;
        },
    };
    return <div>Test</div>;
}
