CREATE USER 'sixtenrewards'@'localhost' IDENTIFIED BY 'admin';
CREATE DATABASE sixtenrewards;
GRANT ALL ON sixtenrewards.* TO 'sixtenrewards'@'localhost';

USE sixtenrewards;

CREATE table BRANCH(
	Branch_id int(10),
	Branch_name varchar(50),
	Branch_location varchar(50),
	CONSTRAINT branch_branch_id_pk PRIMARY KEY(Branch_id)
);

CREATE table CUSTOMER(
	Card_number int(10),
	Customer_name varchar(50),
	Reward_points int(10),
	Address varchar(100),
	Branch_id int(10),
	CONSTRAINT customer_branch_id_fk FOREIGN KEY(Branch_id) REFERENCES
		BRANCH(Branch_id),
	CONSTRAINT customer_card_number_pk PRIMARY KEY(Card_number)
);

CREATE table TRANSACTION(
	Transaction_number int(10),
	Date_and_time datetime,
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
	Product_number int(10),
	Product_name varchar(50),
	Product_price float(10, 5),
	Branch_id int(10),
	CONSTRAINT product_product_number_pk PRIMARY KEY(Product_number),
	CONSTRAINT product_branch_id_fk FOREIGN KEY(Branch_id) REFERENCES BRANCH(Branch_id)
);

CREATE table PROMOSTAR(
	Control_number int(10),
	Amount float(10, 5),
	Expire_date varchar(10),
	Product_number int(10),
	Card_number int(10),
	CONSTRAINT promostar_control_number_pk PRIMARY KEY(Control_number),
	CONSTRAINT promostar_product_number_fk FOREIGN KEY(Product_number) REFERENCES PRODUCT(Product_number),
	CONSTRAINT promostar_card_number_fk FOREIGN KEY(Card_number) REFERENCES CUSTOMER(Card_number)
);

CREATE table PRODUCT_SPENT_PROMOSTAR(
	Transaction_number int(10),
	Control_number int(10),
	CONSTRAINT product_spent_promostar_transaction_number_pk PRIMARY KEY(Transaction_number),
	CONSTRAINT product_spent_promostar_control_number_fk FOREIGN KEY(Control_number) REFERENCES PROMOSTAR(Control_number)
);

CREATE table PRODUCT_ACCUMULATED_PROMOSTAR(
	Transaction_number int(10),
	Control_number int(10),
	CONSTRAINT product_accumulated_promostar_transaction_number_pk PRIMARY KEY(Transaction_number),
	CONSTRAINT product_accumulated_promostar_control_number_fk FOREIGN KEY(Control_number) REFERENCES PROMOSTAR(Control_number)
);

CREATE table STOCK(
	Branch_id int(10),
	Product_name varchar(50),
	Stock int(10),
	CONSTRAINT stock_branch_id_pk PRIMARY KEY(Branch_id, Product_name)
);

