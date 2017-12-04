CREATE USER 'sixtenrewards'@'localhost' IDENTIFIED BY 'admin';
CREATE DATABASE sixtenrewards;
GRANT ALL ON sixtenrewards.* TO 'sixtenrewards'@'localhost';

USE sixtenrewards;

CREATE table BRANCH(
	Branch_id int(10) AUTO_INCREMENT,
	Branch_name varchar(50),
	Branch_location varchar(50),
	CONSTRAINT branch_branch_id_pk PRIMARY KEY(Branch_id)
);

CREATE table CUSTOMER(
	Card_number int(10) AUTO_INCREMENT,
	Customer_name varchar(50),
	Reward_points int(10) DEFAULT 0,
	Address varchar(100),
	Branch_id int(10),
	CONSTRAINT customer_branch_id_fk FOREIGN KEY(Branch_id) REFERENCES
		BRANCH(Branch_id),
	CONSTRAINT customer_card_number_pk PRIMARY KEY(Card_number)
);

CREATE table TRANSACTION(
	Transaction_number int(10) AUTO_INCREMENT,
	Date_and_time date,
	Cash_payment float(10, 5),
	Reward_point_payment int(10),
	Accumulated_reward_points int(10),
	Card_number int(10),
	Branch_id int(10),
	CONSTRAINT transaction_transaction_number_pk PRIMARY
		KEY(Transaction_number),
	CONSTRAINT product_card_number_fk FOREIGN KEY(Card_number)
		REFERENCES CUSTOMER(Card_number),
	CONSTRAINT transaction_branch_id_fk FOREIGN KEY(Branch_id)
		REFERENCES BRANCH(Branch_id)
);

CREATE table PRODUCT(
	Product_number int(10) AUTO_INCREMENT,
	Branch_id int(10),
	Product_name varchar(50),
	Product_price float(10, 5),
	Product_stock int(10) DEFAULT 0,
	CONSTRAINT product_product_number_branch_id_pk PRIMARY KEY(Product_number, Branch_id),
	CONSTRAINT product_branch_id_fk FOREIGN KEY(Branch_id) REFERENCES BRANCH(Branch_id),
	CONSTRAINT product_product_stock_positive CHECK (Product_stock >= 0)
);

CREATE table PROMOSTAR(
	Control_number int(10) AUTO_INCREMENT,
	Amount float(10, 5),
	Expire_date date,
	Product_number int(10),
	Branch_id int(10),
	CONSTRAINT promostar_control_number_pk PRIMARY KEY(Control_number),
	CONSTRAINT promostar_product_number_fk FOREIGN KEY(Product_number) REFERENCES PRODUCT(Product_number),
	CONSTRAINT promostar_branch_id_fk FOREIGN KEY(Branch_id) REFERENCES BRANCH(Branch_id)
);

CREATE table PRODUCT_SPENT_PROMOSTAR(
	Card_number int(10),
	Transaction_number int(10),
	Control_number int(10),
	CONSTRAINT product_spent_promostar_transaction_number_pk PRIMARY KEY(Transaction_number),
	CONSTRAINT product_spent_promostar_control_number_fk FOREIGN KEY(Control_number) REFERENCES PROMOSTAR(Control_number),
	CONSTRAINT product_spent_promostar_card_number_fk FOREIGN KEY(Card_number) REFERENCES CUSTOMER(Card_number)
);

CREATE table PRODUCT_ACCUMULATED_PROMOSTAR(
	Card_number int(10),
	Transaction_number int(10),
	Control_number int(10),
	CONSTRAINT product_accumulated_promostar_control_number_pk PRIMARY KEY(Control_number),
	CONSTRAINT product_accumulated_promostar_transaction_number_fk FOREIGN KEY(Transaction_number) REFERENCES PROMOSTAR(Control_number),
	CONSTRAINT product_accumulated_promostar_card_number_fk FOREIGN KEY(Card_number) REFERENCES CUSTOMER(Card_number)
);


#BRANCH(​ Branch​ ​ ID​ , ​ ​ Branch​ ​ Name,​ ​ Location)
insert into BRANCH(Branch_name, Branch_location) values("Pruto Store", "Near UPLB");
insert into BRANCH(Branch_name, Branch_location) values("Kruto Store", "Los Banos");
insert into BRANCH(Branch_name, Branch_location) values("Ohno Store", "Sa Puso Mo");
insert into BRANCH(Branch_name, Branch_location) values("Crabby Store", "Krusty Krab");
insert into BRANCH(Branch_name, Branch_location) values("Ohyeah Store", "Men's Dorm");
insert into BRANCH(Branch_name, Branch_location) values("Tindahan ni Kyah", "Makati");


#CUSTOMER(​ Card​ ​ Number,​​ ​ Name,​ ​ Reward​ ​ Points,​ ​ Address,​ ​ Branch ​ ​ ID ​ )
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("ciara mae gotis", 0, "UPLB", 1);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("shandy ladera", 0, "De Lasalle", 3);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Rachelle Mae Cabigan", 0, "Ateneo", 4);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Pauline Encio", 0, "UST", 6);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Kim del Mundo", 0, "Likod ng UP", 1);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("John dela Cruz", 0, "Saan", 1);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Name Name Name", 0, "Cat Island", 2);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("nameeeeee", 0, "Di ko na alam", 5);

#PRODUCT(​ Product​ ​ Number,​​ ​ Product​ ​ Name,​ ​ Product​ ​ Price,​ ​ Branch ​ ​ ID ​ )
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Knees and Shoulders", 25, 1, 2);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Magic Sarap", 5.25, 4, 6);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Knorr Cubes", 10.50, 6, 0);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Crab and Corn Soup", 25, 1, 10);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Safeguard", 15, 4, 0);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Zonrox", 20, 2, 5);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Pruto anti kuto shampoo", 200, 1, 0);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Palamig", 5, 3, 2);

#TRANSACTION(​ Transaction​ ​ Number,​​ ​ DateAndTime,​ ​ Payment​ ​ Cash,​ ​ Payment​ ​ Reward,​ ​ Accumulated Reward​ ​ Points,​ ​ Card ​ ​ Number, ​ ​ Branch ​ ​ ID ​ )
insert into TRANSACTION(Date_and_time, Cash_payment, Reward_point_payment, Accumulated_reward_points, Card_number, Branch_id) values('2009/07/16 08:28:01', 150, 10, 3, 1, 1);

#promo
insert into PROMOSTAR(Amount, Expire_date, Product_number, Branch_id) values(2.5, '2017/12/01', 1, 2);