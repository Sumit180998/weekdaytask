import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './App.css';
import JobCard from './Cards/JobCard';
import Header from './Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatass } from './Redux/Slice';
import { Locationarea, jobRole } from './Data/Data';

function App() {
  // const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);
  const [min_exp, setMin_exp] = useState(null);
  const [min_Pay, setMin_Pay] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const[Location,setLocation]=useState()
  const[Role,setRole]=useState()
  const[dataNo, setdatNo]=useState(false)


 const Dispatch=useDispatch()
 const Workdata=useSelector(state=>state)
//  console.log(Workdata)
  // const fetchData = () => {
  //   console.log(offset)
  //   const requestData = {
  //     limit: 10,
  //     offset: offset
  //   };
  
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };
  
  //   axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', requestData, config)
  //     .then((response) => {
  //       const newData = response.data.jdList;
  //       setData(prevData => [...prevData, ...newData]);
  //       setIsFetching(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // useEffect(() => {
  //   fetchData();
  //   // Dispatch(fetchDatass(offset))
  // }, []);
  useEffect(() => {
    // fetchData();
    Dispatch(fetchDatass(offset))
  }, [offset]);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 400 >=
        document.documentElement.scrollHeight
      ) {
        // if(Workdata.value.length > Workdata.total_count){
          // console.log(offset)
        setIsFetching(true);
        setOffset((prev) => prev + 10)
      // }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    
    const filtered =Workdata.value.filter(item => 
      (min_exp ? item.minExp >= min_exp : true) && 
      (min_Pay ? item.minJdSalary >= min_Pay : true) && 
      (companyName ? item.companyName.toLowerCase().includes(companyName.toLowerCase()) : true)
      &&(Location?item.location===Location:true)
      &&(Role?item.jobRole===Role:true)

    );
    // console.log(data.length)

    if (filtered.length > 0) {
      setFilteredData(filtered);
    } else {
      if(Workdata.value.length > 0){
        // console.log(offset)
          setFilteredData(filtered);
          if(  Workdata.checkdata.length > 0){
            setOffset(prev => prev + 10);
            setIsFetching(true)
          }
          else{
         setdatNo(true)
         setIsFetching(false)
          }
     }
    }
  }, [Workdata, min_exp, min_Pay, companyName,Role,Location]);

  return (
    <div className='container'>
      <Header/>
      <div className='content'>
        <div className='content-header'>
        <div style={{ textAlign: 'center', color: "red", fontSize: "15", fontWeight: "700", marginTop: '15px', marginBottom: '15px'}}>Search jobs</div>
        <div className='content-header_search'>
          <div className='content_header_filter'>
            <label style={{margin:"10px"}}> 
              <span>Min experience</span><br/>
              <input type='number' value={min_exp || ''} onChange={(e) => setMin_exp(e.target.value)} placeholder='Min experience...' />
            </label>
            <label  style={{margin:"10px"}}>
              <span>Min base pay</span><br/>
              <input type='number' value={min_Pay || ''} onChange={(e) => setMin_Pay(e.target.value)}  placeholder='Min base pay...' />
            </label>
            <label  style={{margin:"10px"}}>
              <span>Company name</span><br/>
              <input type='text' value={companyName || ''} onChange={(e) => setCompanyName(e.target.value)} placeholder='Company name...'  />
            </label>
            
              <div  style={{margin:"10px"}}>
                <div>
                Location
                </div>
                <select  value={Location} onChange={(e)=>setLocation(e.target.value)}>
                  <option ></option>
                  {Locationarea.map((Loc)=>(
                    <option value={Loc} key={Loc}>{Loc}</option>
                  ))}
                  
                </select>
              </div>

              <div  style={{margin:"10px"}}>
                <div>
                Tech stack
                </div>
                <select  value={Role} onChange={(e)=>setRole(e.target.value)}>
                  <option ></option>
                  {jobRole.map((Loc)=>(
                    <option value={Loc} key={Loc}>{Loc}</option>
                  ))}
                  
                </select>
              </div>


              <div> 

              </div>
           
          </div></div>
          <div className='list_of_JOb_list'>
            {filteredData.map((item, index) => (
              <JobCard Carddetail={item} key={index}/>
            ))}
            
          </div>
          {isFetching && <div className="loader-container">
    <div className="loader"></div>
  </div>}
  {dataNo && <div className="loader-container">
        No data
  </div>}
            
        </div>
      </div>
    </div>
  );
}

export default App;


