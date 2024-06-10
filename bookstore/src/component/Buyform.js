import { useState } from "react"

export default function Buyform(){

    const [form, setForm] = useState({name:'',email:'',book:[]});

    const handleChange = (event) =>{
        const {name,value} = event.target;
        if(name==='book')
            setForm((prevForm) => ({...prevForm, [name]: [...prevForm.book, value] }) )
        else
        setForm((prevForm) =>({...prevForm, [name]: value }) )
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        alert (`name: ${form.name}, email: ${form.email}, book: ${form.book}`)
        alert ('quay ve trang chu')
        window.location.href = 'http://localhost:3000'
    }

    return(
        <div>
            <h2>Please fill in this form to buy some books</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required/>
                <label htmlFor="email">Email: </label>
                <input htmlFor="email" id="email" name="email" value = {form.email} onChange={handleChange} required />

                <h2>Take some book</h2>
                <h3>Self help</h3>
                <input type="checkbox" id="sh1" name="book" value={'book11'} onChange={handleChange} />
                <label htmlFor="sh1">Atomic habit</label><br />
                <input type="checkbox" id="sh2" name="book" value={'book12'} onChange={handleChange} />
                <label htmlFor="sh2">Atomic habit</label><br />
                <input type="checkbox" id="sh3" name="book" value={'book13'} onChange={handleChange} />
                <label htmlFor="sh3">Atomic habit</label><br />
                <input type="checkbox" id="sh4" name="book" value={'book14'} onChange={handleChange} />
                <label htmlFor="sh4">Atomic habit</label><br />

                <h3>Truyen tranh</h3>
                <input type="checkbox" id="t1" name="book" value={'book21'} onChange={handleChange} />
                <label htmlFor="t1">One Piece</label><br />
                <input type="checkbox" id="t2" name="book" value={'book22'} onChange={handleChange} />
                <label htmlFor="t2">One Piece</label><br />
                <input type="checkbox" id="t3" name="book" value={'book23'} onChange={handleChange} />
                <label htmlFor="t3">One Piece</label><br />
                <input type="checkbox" id="t4" name="book" value={'book24'} onChange={handleChange} />
                <label htmlFor="t4">One Piece</label><br />

                <button type="submit">Buy</button>
            </form>
        </div>
    )
}