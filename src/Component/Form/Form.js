import React ,{useEffect, useState}from 'react'
import "./Form.css"
import { useNavigate} from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { database } from '../Firebase';
import { store } from '../Firebase';
import { collection, addDoc ,getDocs,deleteDoc,doc,updateDoc,where,query} from 'firebase/firestore';

const Form = () => {
    const [sno, setSno] = useState("")
    const [name, setName] = useState("")
    const [post, setPost] = useState("")
    const [department, setDepartment] = useState("")
    const [address, setAddress] = useState("")
    const [salary, setSalary] = useState("")
    const [userData, setUserData] = useState([]);
    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    let submitHandler = async (e) => {
        e.preventDefault()
        try {
            let collect = collection(store, "users");
            let data = {sno, name, post, department, address,salary };
            let docref = await addDoc(collect, data);
            console.log(docref);
            setUserData([...userData, { id: docref.id, data }]);
          
        }
        catch(err){
     console.log(err);
        }
        setSno("")
        setName("")
        setPost("")
        setDepartment("")
        setAddress("")
        setSalary("")
    }
   
   
      let getData = async ()=>{
          try {
              let collect = collection(store, "users");
              let docref = await getDocs(collect);
              let a =[];
              await docref.forEach((res) => {
                a=[...a,{id:res.id,data:res.data()}]
              })
              setUserData(a);
              // console.log(docref,a);
          }
          catch(err){
               console.log(err);
          }
          getData()
      }

   
  let deleted =async (id)=>{
    try {
        let collect = collection(store, "users");
        let docref = await deleteDoc(doc(collect,id));
        setUserData(userData.filter(user => user.id !== id));
        
    }
    catch(err){
 console.log(err);
    }
}
 
const filt = async (a)=>{
  try {
    let f= filter;
    let collect = collection(store, "users");
    const q = await query(collect,where(a,"==",f)) ;
    const docref = await getDocs(q);
    let data = [];
    await docref.forEach((res) => {data=[...data,{id:res.id,data:res.data()}]
  });
  console.log(data);
  setFilteredData(data)
    
  } catch (error) {
    console.log(error);
  }
}


    const history = useNavigate()

    const handleClick =()=>{
      signOut(database).then(val=>{
        console.log(val,"val");
        history('/')
      })
    }

    useEffect(() => {
    getData()
    }, [])
    
  return (
    <>
    <div className='container form my-3'>
        <button className="mt-1 button" onClick={handleClick}>Signout</button>
        <h1 className='text-center mb-2'>Fill the details</h1>
        <form className='innerform' onSubmit={submitHandler}>
  <div className="mb-3">
    <label for="number" className="form-label">S.NO.</label>
    <input type="number" className="form-control" value={sno} id="number" placeholder='Enter your id number' onChange={(e)=>setSno(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label for="name" className="form-label">Full Name</label>
    <input type="text" className="form-control" value={name} id="name" placeholder='Enter your Full Name'  onChange={(e)=>setName(e.target.value)} required/>
  </div>
  
  <div className="mb-3">
    <label for="post" className="form-label">Post</label>
    <input type="text" className="form-control" value={post} id="post" placeholder='Enter your Post ' onChange={(e)=>setPost(e.target.value)} required />
  </div>
  
  <div className="mb-3">
    <label for="department" className="form-label">Department</label>
    <input type="text" className="form-control" value={department} id="department" placeholder='Enter your Department'  onChange={(e)=>setDepartment(e.target.value)} required/>
  </div>
  
  <div className="mb-3">
    <label for="address" className="form-label">Address</label>
    <input type="text" className="form-control" value={address} id="address" placeholder='Enter your Permanent Address'  onChange={(e)=>setAddress(e.target.value)} required/>
  </div>
  
  <div className="mb-3">
    <label for="salary" className="form-label">Salary</label>
    <input type="number" className="form-control" value={salary} id="salary" placeholder='Enter your Salary'  onChange={(e)=>setSalary(e.target.value)} required/>
  </div>
  <button type="submit" className="bttn my-2">Submit</button>
</form>
    </div>
 <input type="text" value={filter} onChange={(e)=>{setFilter(e.target.value)}} />
 <button onClick={()=>{filt("name")}}>name filter</button>
 <button onClick={()=>{filt("salary")}}>salary filter</button>
<button onClick={getData}>refresh</button>
    <table className="table table-dark table-hover my-0 ">
 <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">FullName</th>
      <th scope="col">Post</th>
      <th scope="col">Department</th>
      <th scope="col">Address</th>
      <th scope="col">Salary</th>
    </tr>
  </thead>
</table>
    {(filter && filteredData.length > 0 ? filteredData : userData).map((values,index)=> 
       <div key={index}>
       <table className="table table-dark table-hover my-0 ">
  <tbody>
    <tr>
      <th scope="row">{values.data.sno}</th>
      <td >{values.data.name}</td>
      <td >{values.data.post}</td>
      <td >{values.data.department}</td>
      <td >{values.data.address}</td>
      <td >{values.data.salary}</td>
      <td><button onClick={()=>{deleted(values.id)}}>X</button></td>
     

    </tr>
  </tbody>
</table>
       </div>
    )}
    </>
  )
}

export default Form;