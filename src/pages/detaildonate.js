import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import {  useNavigate, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';


function getSubTotal (data){
    let Subtotal = 0
            for(let i = 0; i < data.length; i++){ Subtotal   += data[i].donate_amount}
    return (Subtotal)
}


function DetailDonate() {
    const [subTotal , setsubTotal] = useState(null)
    const [fund, setFund] = useState(null);
    const convertRupiah = require('rupiah-format')
    const [isLoading, setisLoading] = useState(true);
    const [persen, setPersen] = useState(null);
    const [state] = useContext(UserContext);
const [transaction, setTransaction] = useState(null);
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
        console.log("ini data transaction",datatransaction);
        let datagoal = response.data.data.goal
        setsubTotal(getSubTotal(datatransaction))
        setPersen ( 100/datagoal*subTotal)
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
  const handleDonate = async () => {
    try{
        let data ={
            fund_id : fund?.id,
            user_donate_id : state.user.id,
            user_fund_id : fund.user.id,
            status : "pending",
            donate_amount : parseInt(donateamount),
        }
        console.log(data);
       await API.post(`/transaction`, data);
       navigate("/profile")
    }catch (error){
        console.log(error);
    }
}
const getDonate = async () => {
    try {
    const response = await API.get(`/transactions/${id}`);
      setTransaction(response.data.data);
      console.log(transaction);
      console.log(fund.id);
      setisLoading(false)
    } catch (error) {
      console.log(error);
      setisLoading(false)
    }
  };
  useEffect(() => {
    getFund();
}, [form,isLoading]);
useEffect(() => {
    getDonate()

}, [form,isLoading]);
    return ( 
        <div className='pt-5 '>
            {
                isLoading ? <></> : <>
            <div className="col-lg-12  row  justify-content-center">
                 <div className="col-lg-1 " />
                <img className="card-img-top col-lg-4 " src={fund?.image} alt="Card image cap"/>
                <div className="col-lg-5">
                    <h2>
                     
                        {fund?.title}
                        </h2>
                    <h5><span className='text-danger'>{convertRupiah.convert(subTotal)}  </span> gethered from {convertRupiah.convert(fund?.goal)}</h5>
                    <div class="progress mb-3">
                            <div className="progress-bar bg-danger " role="progressbar" style={{width: `${persen}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Math.round(persen)}%</div>
                        </div>
                    <p>{fund?.description}</p>
                    <button className='btn btn-danger w-100 font-weight-bold' data-toggle="modal" data-target="#exampleModalCenter">Donate</button>
                </div>
                <div className='col-lg-1'></div>
            </div> 
            <div className="col-lg-12  row  justify-content-start ">
                <div className="col-lg-2 " />
                <h3 className='font-weight-bold mt-4 col-lg-10'>List Donation ( {transaction?.length} )</h3>
            </div> 
                {/* <!-- Modal  */}
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-body">
                        <form action="#" className='row ml-2 mr-2'>
                            <div className="form-group w-100">
                            <input 
                            type="number" 
                            value={donateamount}
                            name="donateamount"
                            onChange={handleChange}
                            className="form-control w-100"  
                            placeholder="Nominal Donate"></input>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger w-100" onClick={() => handleDonate(donateamount,fund?.id)}>Donate</button>
                    </div>
                    </div>
                </div>
                </div>

            <div className="row col-lg-12 justify-content-center ">
              
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
  