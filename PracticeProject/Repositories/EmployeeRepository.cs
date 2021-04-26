using System;
using System.Collections.Generic;
using System.Linq;
using EmpManagementSystem.Data;
using EmpManagementSystem.Models;

namespace EmpManagementSystem.Repositories
{
	public class EmployeeRepository : IEmployeeRepository
	{
		private readonly EmpManagementSystemDbContext _context;

		public EmployeeRepository(EmpManagementSystemDbContext context)
		{
			this._context = context;
		}

		public IEnumerable<Employee> GetEmployees()
		{
			return this._context.Employees.ToList();
		}

		public Employee GetEmployee(int employeeId)
		{
			return this._context.Employees.FirstOrDefault(e => e.Id == employeeId);
		}

		public Employee AddEmployee(Employee employee)
		{
			var checkEmail = this._context.Employees.FirstOrDefault(e => e.Email == employee.Email);
			var checkEmpCode = this._context.Employees.FirstOrDefault(e => e.EmployeeCode == employee.EmployeeCode);
			if(checkEmail != null || checkEmpCode != null)
            {
				return null;
            }
			var result = this._context.Employees.Add(employee);
			
			_context.SaveChanges();
			return result;
		}

		public Employee UpdateEmployee(Employee employee)
		{
			//var checkEmail = this._context.Employees.FirstOrDefault(e => e.Email == employee.Email);
			//if (checkEmail != null)
			//{
			//	return null;
			//}
			var result = _context.Employees.FirstOrDefault(e => e.Id == employee.Id);
			if (result != null)
			{
				result.EmployeeCode = employee.EmployeeCode;
				result.Name = employee.Name;
				result.Email = employee.Email;
				result.Designation = employee.Designation;
				result.JoiningDate = employee.JoiningDate;
				result.PermanentAddress = employee.PermanentAddress;
				result.CommunicationAddress = employee.CommunicationAddress;

				_context.SaveChanges();

				return result;
			}

			return null;
		}

		public bool DeleteEmployee(int employeeId)
		{
			var result = _context.Employees.FirstOrDefault(e => e.Id == employeeId);
			if (result != null)
			{
				_context.Employees.Remove(result);
				_context.SaveChanges();
				return true;
			}

			return false;
		}
	}

	public interface IEmployeeRepository
	{
		IEnumerable<Employee> GetEmployees();

		Employee GetEmployee(int employeeId);

		Employee AddEmployee(Employee employee);

		Employee UpdateEmployee(Employee employee);

		bool DeleteEmployee(int employeeId);
	}
}
