import '../App.css';
import LandingRight from '../components/assets/landingRight.png'
import LandingLeft from '../components/assets/landingleft.png'
import FundImage from '../components/assets/fund.png'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import { Link, useNavigate } from 'react-router-dom';
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
    
    const [fund, setFund] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [state] = useContext(UserContext);
  
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
       <div className="App Container   bg-danger mb-5 pb-2">
        <div className="container ">
            <div className="container row mb-5 pb-5 " style={{height:550}}>
                <div className='text-white col-lg-7 '>
                    <h1 className='text-left mt-lg-4' >
                    While you are still standing, try to reach out to the people who are falling.
                    </h1>
                    <div className='text-left col-10 mt-lg-5 '>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nulla id numquam at fugit et reiciendis dolor suscipit laboriosam! Deleniti aliquid quod quia facere ratione a ipsa similique! Mollitia, vitae.suscipit laboriosam! Deleniti aliquid quod quia facere ratione a ipsa similique! Mollitia, vitae.                        
                    </div>
                    <button type="button" className="btn btn-light mt-5  "><a href='#donateNow' className='text-dark font-weight-bold'>  Donate Now</a></button>
                </div>
                 <div style={{display:"scroll",position:"absolute",top:100,right:0}}>
                    <img src={LandingRight} ></img>
                 </div>
                 <div style={{display:"scroll",position:"absolute",top:500,left:0}}>
                    <img src={LandingLeft} ></img>
                 </div>
            </div>
        </div>
        </div>
        <div className='pt-5 mt-5 row'>
            <div className="col-lg-4 "></div>
            <div className="col-lg-6  row ml-2">
                <h1>Your donation is very helpful for people affected by forest fires in Kalimantan.</h1>
                <div className="col text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem eos ipsa rerum quaerat, fugiat dolore obcaecati! Laboriosam dicta voluptatibus eaque in totam optio mollitia dolorem adipisci similique vero ex rerum, a culpa molestias exercitationem officiis praesentium dolorum vel ab? Optio maxime molestiae aperiam architecto doloremque nobis eaque accusantium corrupti saepe!</div>
                <div className="col text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ad nihil minima esse accusamus sequi et nostrum, officia a, repellat in quas dolore libero fugit sapiente rem, adipisci dignissimos blanditiis eos omnis quod</div>
            </div>
        </div>
        <div className='pt-5 ' id='donateNow'>
            {/* <div className="col-4 "></div> */}
            <div className="col-12  text-center ">
                <h2 className='text-danger'>Donate Now</h2>
            </div>
            <div className="container" style={{overFlow:"auto",whiteSpace: "nowrap"}}>
            <div className="col-lg-12  row Container justify-content-center " >
            {fund?.map((item,index) => (
                    <div className="border col-lg-4"  
                    item={item} 
                    key={item.id}
                    onClick={() => handleGoToDetail(item.id)}>                    
                    <img className=" img-fluid rounded w-100"
                    style={{height:"18rem"}}
                    src={item?.image} alt="Card image cap"/>
                    <div className="">
                        <h5 className="w-25" style={{boxSizing:"border-box"}}>{item.title}</h5>
                        <p className="col-12">{item.description}</p>
                         <div class="progress mb-3">
                            <div className="progress-bar bg-danger " role="progressbar" style={{width: "50%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">50%</div>
                        </div>
                        <div className='row'>
                            <span className="col-8">Rp. {item?.goal}</span>
                            <a href="#" className="btn btn-danger col-4">Donasi Yuk</a>
                        </div>
                    </div>
                    </div> 
            ))}
        
            </div>

            </div>
            
        </div>
        </div>
    );
}
export default Home;
