import { useEffect } from "react";
import {
	Button,
	Modal,
	Form,
	Alert,
} from "react-bootstrap";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";


export default function ModalForm({
	show,
	handleClose,
	modalState,
	selectedForEdit,
	handleAddNew,
	addNewOrEditLoading,
	handleEditEmployee,
}) {
	const { register, handleSubmit, errors, setValue } = useForm();

	useEffect(() => {
		if (selectedForEdit) {
			for (const prop in selectedForEdit) {
				setValue(prop, selectedForEdit[prop]);
			}
		}
	}, [setValue, selectedForEdit]);

	const onSubmit = async (data) => {
		if (modalState === "addNew") {
			await handleAddNew(data);
		} else {
			await handleEditEmployee(selectedForEdit._id, data);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{modalState === "addNew" ? "Add new employee" : "Edit Employee"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								ref={register({
									required: "Field is required",
								})}
								name="firstName"
								type="text"
								placeholder="first name"
							/>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="firstName"
							as={<Alert variant="danger" />}
						/>

						<Form.Group>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								ref={register({
									required: "Field is required",
								})}
								name="lastName"
								type="text"
								placeholder="last name"
							/>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="lastName"
							as={<Alert variant="danger" />}
						/>

						<Form.Group>
							<Form.Label>Login</Form.Label>
							<Form.Control
								ref={register({
									required: "Field is required",
								})}
								name="logIn"
								type="text"
							/>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="logIn"
							as={<Alert variant="danger" />}
						/>

						<Form.Group>
							<Form.Label>Work Phone</Form.Label>
							<Form.Control
								ref={register({
									required: "Field is required",
								})}
								name="workPhone"
								type="text"
							/>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="workPhone"
							as={<Alert variant="danger" />}
						/>
						<Form.Group>
							<Form.Label>Personal Phone</Form.Label>
							<Form.Control ref={register} name="personalPhone" type="text" />
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="personalPhone"
							as={<Alert variant="danger" />}
						/>
						<Form.Group>
							<Form.Label>Work Email</Form.Label>
							<Form.Control
								ref={register({
									required: "Field is required",
								})}
								name="workEmail"
								type="text"
							/>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="workEmail"
							as={<Alert variant="danger" />}
						/>
						<Form.Group>
							<Form.Label>Personal Email</Form.Label>
							<Form.Control ref={register} name="personalEmail" type="text" />
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="personalEmail"
							as={<Alert variant="danger" />}
						/>
						<Form.Group>
							<Form.Label>Business Location</Form.Label>
							<Form.Control
								as="select"
								ref={register({
									required: "Field is required",
								})}
								name="businessLocation"
							>
								<option defaultValue></option>
								<option>San Francisco</option>
							</Form.Control>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="businessLocation"
							as={<Alert variant="danger" />}
						/>
						<Form.Group>
							<Form.Label>Company</Form.Label>
							<Form.Control
								as="select"
								ref={register({
									required: "Field is required",
								})}
								name="company"
							>
								<option defaultValue></option>
								<option>Moving LCC</option>
								<option>Google</option>
							</Form.Control>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="company"
							as={<Alert variant="danger" />}
						/>
						<Form.Group>
							<Form.Label>Role</Form.Label>
							<Form.Control
								as="select"
								ref={register({
									required: "Field is required",
								})}
								name="role"
							>
								<option defaultValue></option>
								<option>Helper</option>
								<option>Admin</option>
							</Form.Control>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="role"
							as={<Alert variant="danger" />}
						/>
						<Form.Group>
							<Form.Label>Hourly Rate</Form.Label>
							<Form.Control
								as="select"
								ref={register({
									required: "Field is required",
								})}
								name="hourlyRate"
							>
								<option defaultValue></option>
								<option>10.00</option>
								<option>15.00</option>
								<option>20.00</option>
							</Form.Control>
						</Form.Group>
						<ErrorMessage
							errors={errors}
							name="hourlyRate"
							as={<Alert variant="danger" />}
						/>
						<Button
							disabled={addNewOrEditLoading}
							variant="primary"
							type="submit"
						>
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}