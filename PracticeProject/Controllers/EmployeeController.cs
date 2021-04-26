using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Services.Description;
using EmpManagementSystem.Data;
using EmpManagementSystem.Models;
using EmpManagementSystem.Repositories;

namespace EmpManagementSystem.Controllers
{
	public class EmployeeController : ApiController
	{
		private readonly IEmployeeRepository _employeeRepository;

		public EmployeeController()
		{
			this._employeeRepository = new EmployeeRepository(new EmpManagementSystemDbContext());
		}

		// GET: Employee
		public IHttpActionResult GetEmployees()
		{
			IEnumerable<Employee> employees = null;

			employees = this._employeeRepository.GetEmployees().ToList();

			if (!employees.Any())
			{
				return NotFound();
			}

			return Ok(employees);
		}



		// GET: Employee
		public IHttpActionResult GetEmployee(int id)
		{
			Employee employee = null;
			employee = this._employeeRepository.GetEmployee(id);

			if (employee == null)
			{
				return NotFound();
			}

			return Ok(employee);
		}

		[HttpPost]
		public IHttpActionResult AddEmployee([FromBody]Employee employee)
		 {
			if (!ModelState.IsValid)
				return BadRequest(ModelState);
			
			employee = this._employeeRepository.AddEmployee(employee);
			Console.WriteLine(employee);
			if (employee != null)
            {
				return Ok(employee);
			}
			//BadRequest("There is an existing result with this Email or Employee Code")
			return Conflict();
		}

		[HttpPut]
		public IHttpActionResult ModifyEmployee(Employee employee)
		{
			if (!ModelState.IsValid)
				return BadRequest("Invalid data.");

			employee = this._employeeRepository.UpdateEmployee(employee);

			return Ok(employee);
		}

		[HttpDelete]
		public IHttpActionResult DeleteEmployee(Employee employee)
		{
			if (employee.Id <= 0)
				return BadRequest("Not a valid student id");

			var isDeleted = this._employeeRepository.DeleteEmployee(employee.Id);
			if (isDeleted)
			{
				return Ok(employee);
			}
			else
			{
				return BadRequest("Invalid data");
			}
		}
	}
}