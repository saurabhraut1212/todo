import React,{useState,useEffect} from 'react';
import "./Style.css";

const getlocaldata=()=>{                                        //get local storage data back
  const lists=localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}

const Todo = () => {
    const [inputdata,setInputData]=useState("");
    const [items,setItems]=useState(getlocaldata());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false)

   const addItem=()=>{
        if(!inputdata){
            alert("Plz add data")
        }else if(inputdata && toggleButton){
            setItems(
                items.map((element)=>{
                    if(element.id===isEditItem){
                        return{...element,name:inputdata};
                    }else{
                        return element;
                    }
                })
            )
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false)
        }
        else{
            const newInputData={
                id:new Date().getTime().toString(),
                name:inputdata
            }
            setItems([...items,newInputData]);
            setInputData("")
        }
    }

    //edit item
    const editItem=(index)=>{
     const item_get_edit=items.find((element)=>{
        return element.id===index;
     })
     setInputData(item_get_edit.name);
     setIsEditItem(index);
     setToggleButton(true)
    }
    //how to delete items
    const deleteItem=(index)=>{
        const updatedItems=items.filter((element)=>{
            return element.id!==index;
        });
        setItems(updatedItems);
    }
    //delete all items
    const deleteAll=()=>{
        setItems([])
    }

    useEffect(()=>{
     localStorage.setItem("mytodolist",JSON.stringify(items))          // first element is a key and second is value .it work on key value pair so we can pass only the string
    },[items])        //if items value change then it will work
    return (
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/notes.svg" alt="todologo"/>
                    <figcaption>Add your list here ✌</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text"
                    placeholder="✍ Add Item"
                    className="form-control"
                    value={inputdata}
                    onChange={(event)=>setInputData(event.target.value)}
                    />
                    {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i>:
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>}
                   
                </div>
                <div className="showItems">
                       {items.map((element)=>{
                        return (
                            <div className="eachItem" key={element.id} >
                                <h3>{element.name}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={()=>editItem(element.id)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(element.id)}></i>
                                </div>

                            </div>
                        )
                        
                       })}
                    
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAll}>
                        <span>Checklist</span></button>

                </div>
            </div>
            
        </div>
    );
};

export default Todo;