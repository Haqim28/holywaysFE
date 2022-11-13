import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import {  useNavigate, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';


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


function ViewDonate() {
     const [subTotal , setsubTotal] = useState(0)
    const [fund, setFund] = useState(null);
    const convertRupiah = require('rupiah-format')
    const [isLoading, setisLoading] = useState(true);
    const [persen, setPersen] = useState(null);
    const [state] = useContext(UserContext);
const [transaction, setTransaction] = useState(null);
const [transactionPending, setTransactionPending] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams()
    const [form, setForm] = useState({
        fund_id: fund?.id,
        user_id: state.user.id,
        donate_amount: '',
      });
    const getFund = async () => {
      try {
        const response = await API.get(`/fund/${id}`);
        setFund(response.data.data);
        let datatransaction = response.data.data.donation
        console.log("ini data transaction",response.data.data);
        let datagoal = response.data.data.goal
        // setsubTotal(getSubTotal(datatransaction))
        // setPersen ( 100/datagoal*subTotal)
        console.log(datagoal);
        setisLoading(false);
        console.log(fund.id);
      } catch (error) {
        console.log(error);
        setisLoading(false);
      }
    };
  const { donateamount } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleFinishDonate = async () => {
    try{
     
      const responseUpdate = await API.delete(`/fund/${fund?.id}`);
      navigate("/myraisefund")
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
        console.log("ini dia",datatransaction.length);
        setsubTotal(getSubTotal(datatransaction))
          setPersen ( 100/datagoal*subTotal)
        }

      console.log(transaction);
      console.log(fund.id);
      setisLoading(false)
    } catch (error) {
      console.log(error);
      setisLoading(false)
    }
  };

  const getDonatePending = async () => {
    try {
    const response = await API.get(`/transactionsPending/${id}`);
      setTransactionPending(response.data.data);
      setisLoading(false)
    } catch (error) {
      console.log(error);
      setisLoading(false)
    }
  };

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
  useEffect(() => {
    getFund();
}, [form,isLoading]);
useEffect(() => {
    getDonate()
    getDonatePending()
}, [persen,isLoading]);
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
                      {console.log("ini persen",subTotal)}
                            <div className="progress-bar bg-danger " role="progressbar" style={{width: `${persen}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Math.round(persen)}%</div>
                        </div>
                    <p>{fund?.description}</p>
                    <div className='text-center justify-self-end mt-auto '>
                    <button className='btn btn-danger w-75 text-center font-weight-bold ' data-toggle="modal" data-target="#exampleModalCenter">Akhiri Donasi</button>
                    </div>

                </div>
                <div className='col-lg-1'></div>
            </div> 
            <div className="col-lg-12  row  justify-content-start ">
                <div className="col-lg-2 " />
                <h3 className='font-weight-bold mt-4 col-lg-10'>List Donation Success( {transaction?.length} )</h3>
            </div> 
                {/* <!-- Modal  */}
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                    <div className="modal-body ">
                        <div className='modal-text'>
                            <h3 className='text-center text-danger'>Anda Yakin ingin mengakhiri Sesi Donasi Ini ?</h3>
                            <h5 className='text-center'>Dana yang terkumpul {convertRupiah.convert(subTotal)}</h5>
                            <h5>Donasi ini masih membutuhkan dana Sebesar</h5>
                            <span className='font-weight-bold text-center'>{convertRupiah.convert(fund?.goal-subTotal)}</span>
                        </div>
                        
                    </div>
                    <div className="modal-footer align-self-end mt-auto">
                        <button type="button" className="btn btn-danger w-100" onClick={() => handleFinishDonate(donateamount,fund?.id)}>Akhiri Donasi</button>
                    </div>
                    </div>
                </div>
                </div>

              <div className="row  justify-content-center hidenscroll" style={{overflowY:"scroll" , height:"50vh"}}>
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
            <div className="col-lg-12  row  justify-content-start ">
                <div className="col-lg-2 " />
                <h3 className='font-weight-bold mt-4 col-lg-10'>List Donation Not Success( {transaction?.length} )</h3>
            </div> 
            <div className="row  justify-content-center hidenscroll" style={{overflowY:"scroll" , height:"50vh"}}>
             {transactionPending?.map((item) => (                      
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
export default ViewDonate;


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
  