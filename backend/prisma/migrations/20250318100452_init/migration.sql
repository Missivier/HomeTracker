-- CreateTable
CREATE TABLE "roles" (
    "id_role" SERIAL NOT NULL,
    "name_role" CHAR(20) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "houses" (
    "id_house" SERIAL NOT NULL,
    "name_house" CHAR(64) NOT NULL,
    "adress" CHAR(255) NOT NULL,
    "description_house" CHAR(255),

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id_house")
);

-- CreateTable
CREATE TABLE "pets" (
    "id_pet" SERIAL NOT NULL,
    "name_pet" CHAR(20) NOT NULL,
    "date_birthday_pet" DATE,
    "type_pet" CHAR(20),
    "description_pet" CHAR(255),
    "id_house" INTEGER NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id_pet")
);

-- CreateTable
CREATE TABLE "calendars" (
    "id_calendar" SERIAL NOT NULL,
    "name_calendar" CHAR(20) NOT NULL,
    "id_house" INTEGER NOT NULL,

    CONSTRAINT "calendars_pkey" PRIMARY KEY ("id_calendar")
);

-- CreateTable
CREATE TABLE "lists_tasks" (
    "id_list_task" SERIAL NOT NULL,
    "name_list_task" CHAR(20) NOT NULL,
    "id_house" INTEGER NOT NULL,

    CONSTRAINT "lists_tasks_pkey" PRIMARY KEY ("id_list_task")
);

-- CreateTable
CREATE TABLE "status" (
    "id_status" SERIAL NOT NULL,
    "name_status" CHAR(20) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id_status")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "name_user" CHAR(20) NOT NULL,
    "first_name_user" CHAR(20) NOT NULL,
    "username_user" CHAR(20),
    "phone_user" CHAR(10),
    "pwd_user" CHAR(255) NOT NULL,
    "date_birthday_user" DATE,
    "email_user" CHAR(50) NOT NULL,
    "date_inscription" DATE,
    "description_user" CHAR(255),
    "id_role" INTEGER NOT NULL,
    "id_house" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "events" (
    "id_event" SERIAL NOT NULL,
    "name_event" CHAR(20) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "type_event" CHAR(20),
    "description_event" CHAR(255),
    "id_status" INTEGER NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id_budget" SERIAL NOT NULL,
    "name_budget" CHAR(20) NOT NULL,
    "start_amount_budget" SMALLINT NOT NULL,
    "end_amount_budget" SMALLINT NOT NULL,
    "date_creation_budget" DATE NOT NULL,
    "id_status" INTEGER NOT NULL,
    "id_house" INTEGER NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id_budget")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id_task" SERIAL NOT NULL,
    "name_task" CHAR(50) NOT NULL,
    "date_creation_task" DATE NOT NULL,
    "description_task" CHAR(255),
    "id_status" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id_task")
);

-- CreateTable
CREATE TABLE "Appartenir" (
    "id_list_task" INTEGER NOT NULL,
    "id_task" INTEGER NOT NULL,

    CONSTRAINT "Appartenir_pkey" PRIMARY KEY ("id_list_task","id_task")
);

-- CreateTable
CREATE TABLE "affecter" (
    "id_calendar" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,

    CONSTRAINT "affecter_pkey" PRIMARY KEY ("id_calendar","id_event")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_role_key" ON "roles"("name_role");

-- CreateIndex
CREATE UNIQUE INDEX "houses_name_house_key" ON "houses"("name_house");

-- CreateIndex
CREATE UNIQUE INDEX "calendars_name_calendar_key" ON "calendars"("name_calendar");

-- CreateIndex
CREATE UNIQUE INDEX "lists_tasks_name_list_task_key" ON "lists_tasks"("name_list_task");

-- CreateIndex
CREATE UNIQUE INDEX "status_name_status_key" ON "status"("name_status");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_user_key" ON "users"("phone_user");

-- CreateIndex
CREATE UNIQUE INDEX "users_pwd_user_key" ON "users"("pwd_user");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_user_key" ON "users"("email_user");

-- CreateIndex
CREATE UNIQUE INDEX "events_type_event_key" ON "events"("type_event");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_name_budget_key" ON "budgets"("name_budget");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_date_creation_budget_key" ON "budgets"("date_creation_budget");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_date_creation_task_key" ON "tasks"("date_creation_task");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_id_house_fkey" FOREIGN KEY ("id_house") REFERENCES "houses"("id_house") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendars" ADD CONSTRAINT "calendars_id_house_fkey" FOREIGN KEY ("id_house") REFERENCES "houses"("id_house") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lists_tasks" ADD CONSTRAINT "lists_tasks_id_house_fkey" FOREIGN KEY ("id_house") REFERENCES "houses"("id_house") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_house_fkey" FOREIGN KEY ("id_house") REFERENCES "houses"("id_house") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_id_house_fkey" FOREIGN KEY ("id_house") REFERENCES "houses"("id_house") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appartenir" ADD CONSTRAINT "Appartenir_id_list_task_fkey" FOREIGN KEY ("id_list_task") REFERENCES "lists_tasks"("id_list_task") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appartenir" ADD CONSTRAINT "Appartenir_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "tasks"("id_task") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affecter" ADD CONSTRAINT "affecter_id_calendar_fkey" FOREIGN KEY ("id_calendar") REFERENCES "calendars"("id_calendar") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affecter" ADD CONSTRAINT "affecter_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "events"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;
