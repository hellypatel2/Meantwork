import React, { useState } from 'react'
import { ApiPost } from '../../helpers/API/ApiData'
import "./InviteUser.css"
import { toast } from 'react-toastify';


const InviteUser = () => {
    
    const [email, setemail] = useState()

    const onInviteUser = async ()=> {
        try {
            await ApiPost("user/invite", {"emails":email})
                .then((res) => {
                    if (res.data.status === 200) {
                        toast.success(`Email Invitation sent Successfully`)
                       setemail("")
                    } else {
                        toast.error(`Encountered Error `)
                    }

                })
        } catch (error) {
            toast.error("Encountered Error")
        }
    }
    return (
        <div>
            <main class="s-layout__content">
                <div className="container-fluid">
                    <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2 overflow-visible">

                        <div className="md:flex">
                            <div className="md:w-full">
                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 ">
                                    Invite User
                                </h1>
                            </div>
                        </div>


                        <div class="white-banner about-banner p-5 rounded-xl mt-4">
                            <div class="md:w-full pr-2 flex">
                                <div class="lg:w-4/6 md:w-full">
                                    <div class="flex items-center">
                                        <div class="chat-logo pr-3">
                                            <b>Email: </b>
                                        </div>
                                        <div class="chat-input w-full pr-3">
                                            <input type="search" id="comment 60f33732dcc8fb0022f89560" class="search-style rounded-full" placeholder="Email Addresses (Comma Separated)" onChange={(e)=>setemail(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div> <button class="comment-btn-style font-size-16 font-medium tracking-normal rounded-full  cursor-pointer" onClick={() => onInviteUser()}>Invite</button></div>
                            </div>

                        </div>



                    </div>
                </div>
            </main>
        </div>
    )
}

export default InviteUser
