using System.Data.Entity;
using EmpManagementSystem.Models;

namespace EmpManagementSystem.Data
{
	public class EmpManagementSystemDbContext : DbContext
	{
		public EmpManagementSystemDbContext()
			: base("name=EmployeeManagementSystemDb")
		{
		}

		public DbSet<Employee> Employees { get; set; }

	}
}
