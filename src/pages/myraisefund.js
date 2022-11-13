import '../App.css';
import LandingRight from '../components/assets/landingRight.png'
import LandingLeft from '../components/assets/landingleft.png'
import FundImage from '../components/assets/fund.png'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import { useNavigate } from 'react-router-dom';
function MyRaiseFund() {
    const [fund, setFund] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [state] = useContext(UserContext);
    const handleGoToView = (id) => {
        console.log(id);
        navigate(`/ViewDonate/${id}`)
    };
    const getFund = async () => {
      try {
        const response = await API.get(`/funds/${state.user.id}`);
        setFund(response.data.data);
        console.log(response.data.data);
        console.log("ini data fund");
        console.log(fund);
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
    const handleMakeRaise = () => {

        navigate(`/makeraisefund`)
    };

    return ( 
        <div>
       
        <div className='pt-5 '>
            {/* <div className="col-4 "></div> */}
            <div className="ml-lg-5 mb-2 row  justify-content-end">
                <div className="col-lg-7"><h2> My Raise Fund</h2></div>
                <button className='btn btn-danger col-lg-2 text-white bg-danger '
                onClick={handleMakeRaise}>Make Raise Fund</button>
                <div className='col-2'></div>
            </div>
            
      

            <div className=" row  w-100 justify-content-center">
                
                {fund?.map((item,index) => (
                    <div class="card col-lg-3 m-2 pt-2 " onClick={() => handleGoToView(item.id)}>  
                        <img class="card-img-top" style={{height:300,objectFit:"cover"}} src={item?.image} alt="Card image cap"/>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">{item.title}</h5>
                            
                            <p class="card-text " id="text">{item.description}</p>
                            <a href="#" class="align-self-end btn btn-danger w-100 mt-auto">View Donate</a>
                        </div>
                    </div> 
            ))}
           
            </div>
                               
            
        </div>
        </div>
    );
}
export default MyRaiseFund;
