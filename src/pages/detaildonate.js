import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import {Form, Modal} from 'react-bootstrap'
import {   useNavigate, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';





function DetailDonate() {
  const [fund, setFund] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [subTotal , setsubTotal] = useState(0)
  const [persen, setPersen] = useState(null);
  const convertRupiah = require('rupiah-format')
  const [isLoading, setisLoading] = useState(true);
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const {id} = useParams()

  const [form, setForm] = useState({
        fund_id: fund?.id,
        user_id: state.user.id,
        donate_amount: '',
  });
  const { donateamount } = form;
  const getFund = async () => {
      try {
        const response = await API.get(`/fund/${id}`);
        setFund(response.data.data);
        setisLoading(false);
      } catch (error) {
        setisLoading(false);
      }
  };
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  const handleDonate = async () => {
    try{
      
    
        let data ={
            fund_id : fund?.id,
            user_donate_id : state.user.id,
            user_fund_id : fund.user.id,
            donate_amount : parseInt(donateamount),
        }

        const body = JSON.stringify(data);
        const config = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        body,
      };
      const response = await API.post("/transaction", data,config);
      const token = response.data.data.token
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    }catch (error){
        console.log(error);
    }
  }
  const getDonate = async () => {
    try {
    const response = await API.get(`/transactions/${id}`);
      setTransaction(response.data.data);
      if(response.data.data.length !== 0){
        let datatransaction = response.data.data
        let datagoal = response.data.data[0].fund.goal
        setsubTotal(getSubTotal(datatransaction))
        setPersen ( 100/datagoal*subTotal)
        }
      setisLoading(false)
    } catch (error) {
      setisLoading(false)
    }
  };

  //For Midtrans
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-pwwGi7P2PdPXwtjX";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  //For get fund and donate
  useEffect(() => {
    getFund();
    getDonate()
}, [persen,isLoading]);
const [showmodal,setShowmodal] = useState(false)
const handleClose = () => setShowmodal(false);

    return ( 
        <div className='pt-5 '>
            {
                isLoading ? <></> : <>
            <div className="col-lg-12  row  justify-content-center ">
                 {/* <div className="col-lg-1 " /> */}
                 <div className="bg-dark rounded">
                      <img className="card-img-top p-3 " style={{height:400,objectFit:"cover"}} src={fund?.image} alt="Card image cap"/>
                 </div>

                <div className="col-lg-5 d-flex flex-column pb-3" style={{height:400 }}>
                  <h2 className='text-center'>{fund?.title}</h2>
                    <h5 className='mt-5 text-center '><span className='text-danger '>{convertRupiah.convert(subTotal)}  </span> gethered from {convertRupiah.convert(fund?.goal)}</h5>
                    <div class="progress mb-3 mt-5">
                            <div className="progress-bar bg-danger " role="progressbar" style={{width: `${persen}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Math.round(persen)}%</div>
                        </div>
                    <p>{fund?.description}</p>
                    <div className='text-center justify-self-end mt-auto '>
                    <button className='btn btn-danger w-75 text-center font-weight-bold '
                    onClick={() => setShowmodal(true)}>Donate</button>
                    </div>

                </div>
                <div className='col-lg-1'></div>
            </div> 
            <div className="col-lg-12  row  justify-content-start ">
                <div className="col-lg-2 " />
                <h3 className='font-weight-bold mt-4 col-lg-10' onClick={handleProfile}>List Donation ( {transaction?.length} )</h3>
            </div> 
                {/* <!-- Modal  */}
                <Modal show={showmodal} onHide={handleClose} centered>
                {/* <div className="modal-dialog modal-dialog-centered " > */}
                    {/* <div className="modal-content"> */}
                    <Modal.Header>
                        <Modal.Title>
                          <img src="" alt=""></img>
                          Donate Ammount
                        </Modal.Title>
                    </Modal.Header>
                    <div className="modal-body ">
                        <Form action="#" className='row ml-2 mr-2'>
                            <div className="form-group w-100"
                          >
                            <input 
                            type="number" 
                            value={donateamount}
                            name="donateamount"
                            onChange={handleChange}
                            className="form-control w-100"  
                            placeholder="Nominal Donate"></input>
                            <div className="modal-footer align-self-end mt-auto">
                        
                    </div>
                        </div>
                        </Form>
                    </div>
                    <div className="btn btn-danger w-100" 
                        onClick={() => handleDonate(donateamount,fund?.id)}>
                            Donate
                          </div>
                    {/* //</div> */}
                {/* </div> */}
                </Modal>

            <div className="row h-100  justify-content-center hidenscroll overflow-auto" >
              
              {transaction?.map((item) => (                      
             <Card style={{ width: '18rem' }} className="col-8 ml-3 mt-2 mb-2  p-3 border-radius bg-dark" >
                    <div className="">
                    <h5 className="text-left  pt-2 font-weight-bold text-white">{item?.user_donate?.name} </h5>
                      <p className="text-left text-danger" >{milisToDate(item?.create_at)}</p>
                  

                      <p className="text-left font-weight-bold text-white" >Total : {convertRupiah.convert(item?.donate_amount)}</p>
                      
                    </div>
                </Card>
                
              
             ))}
            
            
            
            </div>                
                </>
            }
        </div>
    );
}
export default DetailDonate;


function getSubTotal (data){
  let Subtotal = 0
  if(data.length===0){
    console.log("data nol",data.length);
    return (Subtotal)
  }else{
    for(let i = 0; i < data.length; i++){ Subtotal   += data[i].donate_amount}
  }
  return (Subtotal)
}

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
  