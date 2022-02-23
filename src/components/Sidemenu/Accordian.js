
import React, { useEffect, useState } from 'react';

import "./Accordian.css";


function Accordion({ title, data, setMainState, tag,callback}) {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedState, setCheckedState] = useState([]);
    const showUpArrow = () => <span className='arrow'>&#94;</span>;
    const showDownArrow = () => <span className='arrow'>&#x2228;</span>
    
    useEffect(()=>{
        const clearCheckState=()=>{
            setCheckedState([])
        }
        if(callback){
            callback(clearCheckState)
        }
        
    },[])
    // setCheckedState1(["Rs.0 to Rs.2000","Rs.2000 to Rs.4000","Rs.4000 to Rs.6000"])
       
    // console.log("accoridan.js :",checkedState);
    
    
    //adding value into object array
    const addValue = (inputVal, filterName) => {
        if (inputVal) {
            setMainState((prev) => {

                const currentValues = { ...prev };

                const filters = [...currentValues[filterName]];


                filters.push(inputVal);
                currentValues[filterName] = filters;



                return currentValues;
            })
        }
    };
    // for removing value from object array
    const removeValue = (inputVal, filterName) => {
        if (inputVal) {
            setMainState((prev) => {
                const currentValues = { ...prev };
                currentValues[filterName] = currentValues[filterName].filter((val) => val !== inputVal)
                return currentValues;
            })
        }
    };
    const onclickHandler = (e, name, tag) => {
        const isChecked = e.target.checked;
        console.log(isChecked)
        if (isChecked) {
            addValue(name, tag)
            //Add value to check state
            const newState = [...checkedState, name];
            setCheckedState(newState)
        }
        else {
            removeValue(name, tag)
            //Remove value from check state
            const newState = [...checkedState];
            setCheckedState(newState.filter(value => value !== name));
        }

    }

    const func = () => {
        return (data.map((name) => {
            return (<div className='filtersList' key={Math.random()}>
                <input type="checkbox" name='inputbox' value={name} className="accordian_check"  onChange={(e) => onclickHandler(e, name, tag)} checked={checkedState.includes(name)}></input>

                <label htmlFor="inputbox" >{name}</label>
            </div>)
        }))
    }
    
    
    
    
    
    
    
   
    
    return (
        <div>
            {title &&
                <div onClick={()=>setIsOpen(!isOpen)} className='title-container'>
                    <div className='title' >{title}</div>
                    {<div>{isOpen ? showUpArrow() : showDownArrow()}</div>}
                </div> 
            }
            
            
            {data && isOpen && <div className="content">{func()}</div>}
        </div>);
}

export default Accordion;
