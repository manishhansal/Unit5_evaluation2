import React from "react";

const EmployeeList = () => {

    const [inputName, setInputName] = React.useState("");
    const [inputGender, setInputGender] = React.useState("");
    const [inputDepartment, setInputDepartment] = React.useState("");
    const [inputRole, setInputRole] = React.useState("");
    const [inputSalary, setInputSalary] = React.useState("");

    const [employees, setEmployees] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect( () => {
        getEmployees();
    }, []);

    // GET /posts?title=json-server&author=typicode
    // GET /comments?author.name=typicode
    // const filterMarketing = () => {
    //     fetch (`http://localhost:3005/allData?title=json-server&author=IT`)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             console.log(res)
    //             setEmployees(res);
    //             setIsError(false);
    //         })
    //         .catch((res) => setIsError(true))
    //         .finally(() => setIsLoading(false))
    // }

    // GET /posts?_sort=views&_order=asc
    // Sorting ascending.
    const sortAsc = () => {
        fetch (`http://localhost:3005/allData?_sort=salary&_order=asc`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setEmployees(res);
                setIsError(false);
            })
            .catch((res) => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    // Sorting descending.
    const sortDesc = () => {
        fetch (`http://localhost:3005/allData?_sort=salary&_order=desc`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setEmployees(res);
                setIsError(false);
            })
            .catch((res) => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    const getEmployees = () => {
        setIsLoading(true);
        fetch (`http://localhost:3005/allData`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setEmployees(res);
                setIsError(false);
            })
            .catch((res) => setIsError(true))
            .finally(() => setIsLoading(false))
    };

    const handleAdd = () => {
        console.log(inputName);
        console.log(inputGender);
        console.log(inputDepartment);
        console.log(inputRole);
        console.log(inputSalary);
        if(inputName!=="" && inputGender!=="" && inputDepartment!=="" && inputRole!=="" && inputSalary!==""){
            const payload = {
                name: inputName,
                gender: inputGender,
                department: inputDepartment,
                role: inputRole,
                salary: inputSalary,
                status: false
            };

            const payloadjson = JSON.stringify(payload);

            fetch(`http://localhost:3005/allData`, {
                method: "POST",
                body: payloadjson,
                headers: {
                    "content-type" : "application/json"
                }
            }).then((res) => {
                console.log(res)
                console.log(res.data)
                getEmployees();
            })
            .catch((err) => setIsError(true))
            .finally(() => setIsLoading(false));
        }
        // setInputValue("")
    };

    return (
        <>
            <div>
                <input 
                    placeholder="Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                ></input>
                <br></br>
                <input 
                    placeholder="Gender"
                    value={inputGender}
                    onChange={(e) => setInputGender(e.target.value)}
                ></input>
                <br></br>
                <input 
                    placeholder="Department"
                    value={inputDepartment}
                    onChange={(e) => setInputDepartment(e.target.value)}
                ></input>
                <br></br>
                <input 
                    placeholder="Role"
                    value={inputRole}
                    onChange={(e) => setInputRole(e.target.value)}
                ></input>
                <br></br>
                <input 
                    placeholder="Salary"
                    value={inputSalary}
                    onChange={(e) => setInputSalary(e.target.value)}
                ></input>
                <br></br>
                <button onClick={handleAdd}>ADD EMPLOYEE</button>
            </div>
            <hr></hr>
            <div>
                <button onClick={getEmployees}>Show All Departments</button>
                <button onClick={filterMarketing}>Show Marketing</button>
                <button>Show HR</button>
                <button>Show IT</button>
                <button>Show Finance</button>
            </div>
            <br></br>
            <div>
                <button onClick={sortAsc}>Sort By Salary Ascending</button>
                <button onClick={sortDesc}>Sort By Salary Descending</button>
            </div>

            {
                employees.map((item) => {
                    return <div className="employees">
                        <h3>Name : {item.name}</h3>
                        <h3>Gender : {item.gender}</h3>
                        <h3>Department : {item.department}</h3>
                        <h3>Role : {item.role}</h3>
                        <h3>Salary : {item.salary}</h3>
                    </div>
                })
            }
        </>
    )
}

export default EmployeeList