import React from 'react'
import './Navber.css'

export default function Navber() {
  return (
   <div className='Navber'>
    {/* <nav className=''><i class="fa-brands fa-facebook"> sumit</i></nav> */}
    <nav className='naver'>
        <div className='naver_nav'> 
            <p style={{ marginLeft:'10px',fontSize:'20px'}}>home</p> 
            <p style={{ marginLeft:'10px',fontSize:'20px'}}>Service</p> 
            <p style={{ marginLeft:'10px',fontSize:'20px'}}>About</p> 
            
        </div> 
         <div> <img src='https://img.freepik.com/premium-vector/jester-esport-mascot-logo-design_408559-46.jpg?w=740' style={{width:'150px' }}/></div>
          <div> 
            <label style={{marginRight:'50px', borderRadius:'10px', broder:'2px solid black'}}>
                <input type='text' />
                <button>Search</button>
                
            </label>
            </div></nav>

   </div>
  )
}
