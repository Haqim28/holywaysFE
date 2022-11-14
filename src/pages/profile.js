import Vespa from "../components/assets/vespa.png";
import "../components/assets/css/navbar.css";
import Icon from "../components/assets/holywaysicon.png"
import Orang from "../components/assets/orang.png";
import Finish from "../components/assets/Finsihed.png";
import "../components/assets/css/profile.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useQuery } from "react-query";



function Profile() {
  const navigate = useNavigate();
  const convertRupiah = require('rupiah-format')
  const [state] = useContext(UserContext);
  const [isLoading,setisLoading] = useState(false)
  const id = state.user.id;
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const { data: profile, refetch  } = useQuery("profileCache", async () => {
    const response = await API.get(`/user/${id}`);
    console.log(response.data.data);
    return response.data.data;
  });
  const { data: transaction  } = useQuery("transactionCache", async () => {
    const response = await API.get(`/transaction/${state.user.id}`);
    console.log(response.data.data);
    return response.data.data;
  });

  return (

    <div className="container">
      {isLoading ? <> 
                  </> 
                  : 
      <>
      <div className="row">
        <div className="justify-content-start ml-5 mr-5 mt-5 col-lg-6">
          <div className="mb-3 title-edit">My Profile</div>
          <div className="d-md-flex">
            <div className="justify-content-start" onClick={handleEditProfile}>
              <img src={Orang} alt="" width={250}></img>
              {/* <button className="btn-block btn-edit-css mt-2 text-white">
                Edit Profile
              </button> */}
            </div>
            <div className="justify-content-end ml-3">
              <div className="mb-3">
                <h5 className="subtitle-edit">FullName</h5>
                <span className="isiProfile-edit">
                  {profile?.fullname ? profile?.fullname : "-"}
                </span>
              </div>
              <div className="mb-3">
                <h5 className="subtitle-edit">Email</h5>
                <span className="isiProfile-edit">
                  {profile?.email ? profile?.email : "-"}
                </span>
              </div>
              <div>
                <h5 className="subtitle-edit">Phone</h5>
                <span className="isiProfile-edit">
                  {profile?.phone ? profile?.phone : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-5 ml-auto hidenscroll col-lg-4" >
        <span className="title-edit">History Donation</span>
              <div className="hidenscroll" style={{overflowY:"scroll" , height:"70vh"}}>
              {transaction?.map((item) => ( 
          <div className="row p-3 bg-dark  border">
            <div className="justify-content-start col-lg-8 ">
              <h5 className="text-white  ">{item?.fund?.title}</h5>
              <h5 className="history-day">
                <span className="font-weight-bold mt-3">
                  {milisToDate(item?.create_at)}
                  </span>
              </h5>
              <span className="history-ttl ">Total : Rp {convertRupiah.convert(item?.donate_amount)}</span>
            </div>
            <div className="justify-content-end col-lg-4">
              <img src={Icon} alt=""></img>
              <div className="pr-5">
                { item?.status === "success" ? <img src={Finish} alt=""></img> :  
                
                <h5 className="text-danger mt-2">{item?.status}</h5>

                }
                
              </div>
            </div>
          </div>
            ))}  
              </div>
        </div>
    
      </div>
      </>}
      
    </div>
  );
}
export default Profile;


function milisToDate(milis) {
  let date = new Date(milis);
  let convertMonth = month => {
    switch (month) {
      case 0:
        return 'Januari';
      case 1:
        return 'Februari';
      case 2:
        return 'Maret';
      case 3:
        return 'April';
      case 4:
        return 'Mei';
      case 5:
        return 'Juni';
      case 6:
        return 'Juli';
      case 7:
        return 'Agustus';
      case 8:
        return 'September';
      case 9:
        return 'Oktober';
      case 10:
        return 'November';
      case 11:
        return 'Desember';
      default:
        return 'Unknown';
    }
  };

  let dateNumber = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return `${dateNumber} ${convertMonth(date.getMonth())} ${date.getFullYear()}`;
}

