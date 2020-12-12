import { useEffect, useState } from "react";
import {
	Container,
	Row,
	Table,
	Card,
	Button,
	Spinner,
} from "react-bootstrap";

import ModalForm from './ModalForm';

function App() {
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(true);
	const chekedCount = employees.filter((d) => d.isChecked).length;

	const [deleteLoading, setDeleteLoading] = useState(false);
	const [addNewOrEditLoading, setaddNewOrEditLoading] = useState(false);

	const [show, setShow] = useState(false);
	const [modalState, setModalState] = useState("addNew");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [selectedForEdit, setSelectedForEdit] = useState();

	useEffect(() => {
		async function search() {
			try {
				const res = await fetch(`${process.env.REACT_APP_SERVER_URL}`);
				const users = await res.json();
				setEmployees(users);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}

		search();
	}, []);

	const handleCheckbox = (data) => {
		setEmployees((prev) => {
			const findIndex = prev.findIndex((emp) => emp._id === data._id);

			const newArray = [
				...prev.slice(0, findIndex),
				{
					...prev[findIndex],
					isChecked: !data?.isChecked ?? true,
				},
				...prev.slice(findIndex + 1),
			];

			return newArray;
		});
	};

	const handleDelete = async () => {
		try {
			setDeleteLoading(true);
			const ids = employees
				.filter((data) => data.isChecked)
				.map((emp) => emp._id);
			const newData = employees.filter((data) => !data.isChecked);
			const res = await fetch(
				`${process.env.REACT_APP_SERVER_URL}${ids.join(",")}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			alert(`Data has been deleted | deletedCount: ${data.deletedCount}`);

			setEmployees(newData);
			setDeleteLoading(false);
		} catch (error) {
			alert("Error delete data");
			console.error(error);
			setDeleteLoading(false);
		}
	};

	const handleClickAddNewButton = () => {
		setModalState("addNew");
		setSelectedForEdit();
		handleShow();
	};

	const handleClickEditButton = () => {
		setModalState("Edit");
		const editEmp = employees.find((d) => d.isChecked);
		setSelectedForEdit(editEmp);
		handleShow();
	};

	const handleAddNew = async (data) => {
		try {
			setaddNewOrEditLoading(true);
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if(response.ok) {
				const employee = await response.json();
				console.log(employee);
				setEmployees([...employees, employee]);
			}
			else { 
				throw new Error(await response.text());
			}

			setaddNewOrEditLoading(false);
		} catch (error) {
			alert(`Error add new employee \n ${error}`);
			setaddNewOrEditLoading(false);
		}
	};

	const handleEditEmployee = async (id, data) => {
		try {
			setaddNewOrEditLoading(true);
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${id}`, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});


			if(response.ok) {
				const employee = await response.json();
				setEmployees((prev) => {
					const findIndex = prev.findIndex((emp) => emp._id === id);
	
					const newArray = [
						...prev.slice(0, findIndex),
						{
							...employee,
						},
						...prev.slice(findIndex + 1),
					];
	
					return newArray;
				});
			}
			else { 
				throw new Error(await response.text());
			}

			alert("Success edit employee");
			setaddNewOrEditLoading(false);
		} catch (error) {
			alert(`Error edit employee \n ${error}`);
			setaddNewOrEditLoading(false);
		}
	};

	return (
		<Container>
			<Row>
				{loading ? (
					<p>Loading data ...</p>
				) : (
					<Card className="w-100">
						<Card.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>ID</th>
										<th>Full Name</th>
										<th>Role</th>
										<th>Business Location</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Hourly Rate</th>
									</tr>
								</thead>
								<tbody>
									{employees.map((emp) => (
										<tr key={emp._id}>
											<td>
												<input
													type="checkbox"
													checked={emp?.isChecked ?? false}
													onChange={() => handleCheckbox(emp)}
												/>
											</td>
											<td>{emp._id}</td>
											<td>
												{emp.firstName} {emp.lastName}
											</td>
											<td>{emp.role}</td>
											<td>{emp.businessLocation}</td>
											<td>{emp.workEmail}</td>
											<td>{emp.workPhone}</td>
											<td>{emp.hourlyRate} / h</td>
										</tr>
									))}
								</tbody>
							</Table>
							<Button
								disabled={chekedCount > 1 && chekedCount < 1}
								className="text-uppercase mr-1"
								onClick={handleClickAddNewButton}
							>
								Add employee
							</Button>
							<Button
								disabled={chekedCount > 1 || chekedCount === 0}
								variant="outline-secondary"
								className="mr-1"
								onClick={handleClickEditButton}
							>
								Edit
							</Button>
							<Button
								disabled={chekedCount < 1}
								variant="outline-danger"
								onClick={handleDelete}
							>
								{deleteLoading ? (
									<Spinner animation="border" size="sm" />
								) : (
									"Delete"
								)}
							</Button>
						</Card.Body>
					</Card>
				)}
			</Row>

			<ModalForm
				show={show}
				handleClose={handleClose}
				modalState={modalState}
				selectedForEdit={selectedForEdit}
				handleAddNew={handleAddNew}
				addNewOrEditLoading={addNewOrEditLoading}
				handleEditEmployee={handleEditEmployee}
			/>
		</Container>
	);
}

export default App;
