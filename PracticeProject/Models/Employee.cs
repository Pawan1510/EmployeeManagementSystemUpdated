using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmpManagementSystem.Models
{
	[Table("Employees")]
    public class Employee
    {
	    [Key]
		public int Id { get; set; }

	    public string EmployeeCode { get; set; }

	    public string Name { get; set; }

		[RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
		public string Email { get; set; }

	    public string Designation { get; set; }

		public DateTime JoiningDate { get; set; }

		//public int DepartmentId { get; set; }

		//[ForeignKey(nameof(DepartmentId))]
		//public Department Department { get; set; }

		public string PermanentAddress { get; set; }

		public string CommunicationAddress { get; set; }
	}
}
