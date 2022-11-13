import '../App.css';
import LandingRight from '../components/assets/landingRight.png'
import LandingLeft from '../components/assets/landingleft.png'
import FundImage from '../components/assets/fund.png'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import { L5, L40 } from 'react-isloading'
import LoginPage from "../components/auth/Login";

import { Link, useNavigate } from 'react-router-dom';

const convertRupiah = require('rupiah-format')


function getSubTotal (data){
    let Subtotal = 0
            for(let i = 0; i < data.length; i++){
                for (let y = 0 ; y<data[i].donation.length;y++) {
                Subtotal   += data[y].price}
                }
                console.log(data[0].donation.length);
    return (Subtotal)
}


function Home() {
    const [showLogin, setShowLogin] = useState(false)
    const [fund, setFund] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [state] = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);

    
  
    const getFund = async () => {
      try {
        const response = await API.get(`/funds`);
        setFund(response.data.data);
        console.log("ini data fund",fund);
        setisLoading(false);
      } catch (error) {
        console.log(error);
        setisLoading(false);
      }
    };
    useEffect(() => {
        getFund();
    }, [isLoading]);
  
    const navigate = useNavigate()
    const handleGoToDetail = (id) => {
        console.log(id);
        navigate(`DetailDonate/${id}`)
    };
    return ( 
        <div>
            {isLoading? <><L5
  style={{
    height: "15rem",
    width: "15rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }}
/></> : <>
       <div className="App Container   bg-danger mb-5 pb-2">
        <div className="container ">
            <div className="container row mb-5 pb-5 " style={{height:550}}>
                <div className='text-white col-lg-7 '>
                    <h2 className='text-left mt-lg-4' style={{fontFamily:"Product Sans"}}>
                    Saat anda masih berada di atas Cobalah untuk membantu orang-orang yang sedang mendapatkan cobaan
                    </h2>
                    <div className='text-justify col-10 mt-lg-5 '>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nulla id numquam at fugit et reiciendis dolor suscipit laboriosam! Deleniti aliquid quod quia facere ratione a ipsa similique! Mollitia, vitae.suscipit laboriosam! Deleniti aliquid quod quia facere ratione a ipsa similique! Mollitia, vitae.                        
                    </div>
                    <a href='#donateNow' className='text-dark font-weight-bold'>
                    <button type="button" className="btn btn-outline-light btn-danger mt-5  text-bold">  Donate Now</button>
                    </a>
                </div>
                 <div style={{display:"scroll",position:"absolute",top:100,right:0}}>
                    <img src={LandingRight} ></img>
                 </div>
                 <div style={{ position:"absolute",top:500,left:0}}>
                    <img src={LandingLeft} ></img>
                 </div>
            </div>
        </div>
        </div>
        <div className='pt-5 mt-5 row'>
            <div className="col-lg-4 "></div>
            <div className="col-lg-6  row ml-2">
                <h2 style={{fontFamily:"Product Sans"}} className="text-bold">Donasi Anda sangat membantu masyarakat yang terkena dampak kebakaran hutan di Kalimantan
.</h2>
                <div className="col text-justify" style={{fontFamily:"Avenir"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem eos ipsa rerum quaerat, fugiat dolore obcaecati! Laboriosam dicta voluptatibus eaque in totam optio mollitia dolorem adipisci similique vero ex rerum, a culpa molestias exercitationem officiis praesentium dolorum vel ab? Optio maxime molestiae aperiam architecto doloremque nobis eaque accusantium corrupti saepe!</div>
                <div className="col text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ad nihil minima esse accusamus sequi et nostrum, officia a, repellat in quas dolore libero fugit sapiente rem, adipisci dignissimos blanditiis eos omnis quod</div>
            </div>
        </div>
        <div className='pt-5 ' id='donateNow'>
            {/* <div className="col-4 "></div> */}
            <div className="col-12  text-center mt-lg-5">
                <h2 className='text-danger '>Donate Now</h2>
            </div>
            <div className=" row  w-100 justify-content-center ">
                
                {fund?.map((item,index) => (
                        <div className="card col-lg-3 m-2 pt-2"  
                            item={item} 
                            key={item.id}
                            >                    
                            <img className=" img-fluid rounded w-100"
                            style={{height:"18rem",objectFit:"cover"}}
                            src={item?.image} alt="Card image cap"/>
                        
                            <div className="card-body d-flex flex-column">
                                
                                <h5 className=" card-title" >{item.title}</h5>
                                <p className="text-justify">{item.description.slice(0,100)}...</p>
                                <div className=" mt-auto">
                                    {/* <div class="progress mb-3 mt-auto">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{width: "50%"}} aria-valuenow="25" aria-valuemin="0"  aria-valuemax="100">50%</div>
                                    </div> */}
                                    <div className='row mt-auto'>
                                        <span className="col-7">{convertRupiah.convert(item?.goal)}</span>
                                        {state.isLogin ? 
                                         <><a href="#" className="align-self-end btn btn-danger col-5 " onClick={() => handleGoToDetail(item.id)}>Donasi Yuk</a> </>
                                         : 
                                         <>
                                         
                                         <a href="#" className="align-self-end btn btn-danger col-5 " onClick={() => setShowLogin(true)}>Donasi Yuk</a>
                                         </>
                                         }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                ))}
                </div>
                <LoginPage show={showLogin} setShow={setShowLogin} setShowRegister={setShowRegister} />
        </div>
        </>}
        </div>
    );
}
export default Home;
