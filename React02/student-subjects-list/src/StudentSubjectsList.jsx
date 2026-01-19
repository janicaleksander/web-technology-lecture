import {useEffect, useState} from "react";

function StudentSubjectsList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        name: "",
        duration: ""
    });

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    const toJSON = e => {
        e.preventDefault()
        downloadFile({
            data: JSON.stringify(tasks),
            fileName: 'subject-list.json',
            fileType: 'text/json',
        })
    }

    const loadDummyData = () => {
        setTasks([
            { name: "Mathematics I", duration: 90 },
            { name: "Physics I", duration: 90 },
            { name: "History", duration: 60 },
            { name: "Biology", duration: 75 },
            { name: "English C1", duration: 75 }
        ]);
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    }

function addTask() {
    const name = newTask.name.trim();
    const durationStr = newTask.duration;
    if (name === "") return;

    if (!/^[0-9]+$/.test(durationStr)) return;

    if (durationStr.startsWith("0")) return;
    const duration = Number(durationStr);

    if (!Number.isInteger(duration) || duration <= 0) return;
    setTasks(t => [...t, { name, duration }]);
    setNewTask({
        name: "",
        duration: ""
    });
}

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i)=> i!==index);  //i to indeks elementu, ale żeby nie było konfliktu nazw
        setTasks(updatedTasks);
    }                                                   
    function moveUpTask(index){
        if(index>0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]]=
            [updatedTasks[index-1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }
    function moveDownTask(index){
        if(index<tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]]=
            [updatedTasks[index+1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    useEffect(() => {
        loadDummyData()
    }, []);
    return(<div className="subjects-list">
        <h2>Student subjects list!</h2>
        <div>
            <input name={"name"} type="text" placeholder="New subject name"
                value={newTask.name} onChange={handleInputChange}/>
            <input name={"duration"} type="number" placeholder="Subject duration (in minutes)"
                value={newTask.duration} onChange={handleInputChange} min={"0"}/>
            <button className="to-json-button" onClick={toJSON}>TO JSON</button>
            <button className="add-button" onClick={addTask}>ADD</button>
       </div>
       <ol>
            {tasks.map((subject, index) =>
                <li key={index}>
                    <div>
                        <h3>
                            "SUBJECT NAME:"
                        </h3>
                        <span className="subject-name">{subject.name}</span>
                    </div>
                    <div>
                        <h3>
                            "DURATION (in minutes):"
                        </h3>
                        <span className="subject-duration">{subject.duration}</span>
                    </div>
                    <button className="delete-button" onClick={() => deleteTask(index)}>Delete Task</button>
                    <button className="move-button" onClick={() => moveUpTask(index)}>UP</button>
                    <button className="move-button" onClick={() => moveDownTask(index)}>DOWN</button>
                </li>
            )}
       </ol>
    </div>);
}
export default StudentSubjectsList