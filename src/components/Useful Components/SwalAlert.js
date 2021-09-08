import React from 'react'
import React from 'react'

export default function SwalAlert() {
    return (
        <div>
            { swal
                .fire({
                    title: "Are you Sure ?",
                    text: `${mentee.username} will be removed !`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Remove!",
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        const res = await ApiGet(
                            "mentorship/remove/" + "mentee" + "/" + props.id + "/" + mentee._id
                        );
                        try {
                            if (res.data.status === 200) {
                                swal.fire({
                                    title: "Mentee Removed Successful",
                                    text: res.data.message,
                                    icon: "success",
                                });
                                getMentorshipData();
                            } else {
                                swal.fire({
                                    title: "Removing Mentee Failed",
                                    text: res.data.message,
                                    icon: "error",
                                });
                            }
                        } catch (err) {
                            swal.fire({
                                title: "Something Went Wrong",
                                text: res.data.message,
                                icon: "error",
                            });
                        }
                    }
                });}
        </div>
    )
}


