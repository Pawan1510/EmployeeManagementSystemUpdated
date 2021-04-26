USE master
GO

IF NOT EXISTS (
        SELECT *
        FROM sys.databases
        WHERE name = 'EmployeeManagementSystem'
        )
BEGIN
    CREATE DATABASE [EmployeeManagementSystem]
END
GO

USE [EmployeeManagementSystem]
GO


IF NOT EXISTS (SELECT 1 FROM SYSOBJECTS WHERE [type] = 'U' AND [name] = 'Departments')
BEGIN

	PRINT 'CREATE TABLE  [dbo].[Departments`]'
	
	CREATE TABLE  [dbo].[Departments](
		[Id]				int IDENTITY(1,1),
		[Name]				VARCHAR(100) NOT NULL,
		[Location]			VARCHAR(100) NOT NULL
		CONSTRAINT [PK_Department_Id] PRIMARY KEY CLUSTERED ([Id] ASC)
	) ON [PRIMARY]
	 
END
GO

IF NOT EXISTS (SELECT 1 FROM SYSOBJECTS WHERE [type] = 'U' AND [name] = 'Employees')
BEGIN

	PRINT 'CREATE TABLE  [dbo].[Employees`]'
	
	CREATE TABLE  [dbo].[Employees](
		[Id]				int IDENTITY(1,1),
		[EmployeeCode]		VARCHAR(100) NOT NULL,
		[Name]			VARCHAR(100) NOT NULL,
		[Email]	VARCHAR(50) NOT NULL,
		[Designation]			VARCHAR(50) NOT NULL,
		[JoiningDate]		DATE NOT NULL,
		[DepartmentId]		int NOT NULL,
		[PermanentAddress]	VARCHAR(100) NOT NULL,
		[CommunicationAddress]	VARCHAR(100) NOT NULL,
		CONSTRAINT [PK_Employees_Id] PRIMARY KEY CLUSTERED ([Id] ASC),
		CONSTRAINT [FK_Employees_Departments] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([Id])
	) ON [PRIMARY]
	 
END
GO

IF EXISTS (SELECT 1 FROM SYSOBJECTS WHERE [type] = 'U' AND [name] = 'Departments')
BEGIN
	
	IF NOT EXISTS (SELECT 1 FROM [departments] WHERE	[Name] = 'Administration')
	BEGIN
		INSERT INTO departments ([Name], [Location]) VALUES ('Administration', 'India');
	END

	IF NOT EXISTS (SELECT 1 FROM [departments] WHERE	[Name] = 'Marketing')
	BEGIN
		INSERT INTO departments ([Name], [Location]) VALUES ('Marketing', 'Indiana');
	END

	IF NOT EXISTS (SELECT 1 FROM [departments] WHERE	[Name] = 'Human Resources')
	BEGIN
		INSERT INTO departments ([Name], [Location]) VALUES ('Human Resources', 'India');
	END

	IF NOT EXISTS (SELECT 1 FROM [departments] WHERE	[Name] = 'IT Support')
	BEGIN
			INSERT INTO departments ([Name], [Location]) VALUES ('IT Support', 'India');
	END

	IF NOT EXISTS (SELECT 1 FROM [departments] WHERE	[Name] = 'Product Engineering')
	BEGIN
			INSERT INTO departments ([Name], [Location]) VALUES ('Product Engineering', 'India');
	END
	
END

IF EXISTS (SELECT 1 FROM SYSOBJECTS WHERE [type] = 'U' AND [name] = 'Employees')
BEGIN
	IF NOT EXISTS (SELECT 1 FROM [Employees] WHERE [EmployeeCode] = 'CR-001')
	BEGIN
		INSERT INTO [Employees] ([EmployeeCode], [Name], [Email], [Designation], [JoiningDate],[DepartmentId],[PermanentAddress],[CommunicationAddress]) 
			VALUES ('CR-001', 'Anuj Shukla','anuj.shukla@crowe.com','Manager', '05-02-2020' ,1,'Bhagat Colony Gali No 14', 'Phone: 798****47');
	END

	IF NOT EXISTS (SELECT 1 FROM [Employees] WHERE [EmployeeCode] = 'CR-002')
	BEGIN
		INSERT INTO [Employees] ([EmployeeCode], [Name], [Email], [Designation], [JoiningDate],[DepartmentId],[PermanentAddress],[CommunicationAddress]) 
			VALUES ('CR-002', 'Mukund Kumar','mukund.kumar@crowe.com','Manager', '05-02-2020' ,1,'Bhagat Colony Gali No 14', 'Phone: 798****47');
	END
	IF NOT EXISTS (SELECT 1 FROM [Employees] WHERE [EmployeeCode] = 'CR-003')
	BEGIN
		INSERT INTO [Employees] ([EmployeeCode], [Name], [Email], [Designation], [JoiningDate],[DepartmentId],[PermanentAddress],[CommunicationAddress]) 
			VALUES ('CR-003', 'Arun Yadav','arun.yadav@crowe.com','Manager', '05-02-2020' ,1,'Bhagat Colony Gali No 14', 'Phone: 798****47');
	END
	IF NOT EXISTS (SELECT 1 FROM [Employees] WHERE [EmployeeCode] = 'CR-004')
	BEGIN
		INSERT INTO [Employees] ([EmployeeCode], [Name], [Email], [Designation], [JoiningDate],[DepartmentId],[PermanentAddress],[CommunicationAddress]) 
			VALUES ('CR-004', 'Sachin Tekchandani','sachin.tekchandani@crowe.com','Manager', '05-02-2020' ,1,'Bhagat Colony Gali No 14', 'Phone: 798****47');
	END
END