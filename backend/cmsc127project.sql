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

DELIMITER //

CREATE TRIGGER UPDATE_REWARD_POINT
	AFTER INSERT ON TRANSACTION
	FOR EACH ROW
	BEGIN
		UPDATE CUSTOMER,TRANSACTION SET CUSTOMER.Reward_points = CUSTOMER.Reward_points+(floor(TRANSACTION.Cash_payment/50))
		where TRANSACTION.Card_number = CUSTOMER.Card_number;
	END//
DELIMITER ;


#BRANCH(​ Branch​ ​ ID​ , ​ ​ Branch​ ​ Name,​ ​ Location)
insert into BRANCH(Branch_name, Branch_location) values("Pruto Store", "Near UPLB");
insert into BRANCH(Branch_name, Branch_location) values("Kruto Store", "Los Banos");
insert into BRANCH(Branch_name, Branch_location) values("Ohno Store", "Sa Puso Mo");
insert into BRANCH(Branch_name, Branch_location) values("Crabby Store", "Krusty Krab");
insert into BRANCH(Branch_name, Branch_location) values("Ohyeah Store", "Men's Dorm");
insert into BRANCH(Branch_name, Branch_location) values("Tindahan ni Kyah", "Makati");
insert into BRANCH(Branch_name, Branch_location) values("Presto Corner", "West Boulevard");
insert into BRANCH(Branch_name, Branch_location) values("Shannon's Goods", "Falker Bridge");
insert into BRANCH(Branch_name, Branch_location) values("GreatBuy", "Amarant Avenue");
insert into BRANCH(Branch_name, Branch_location) values("Bucky's Express", "Sunshine Bay");
insert into BRANCH(Branch_name, Branch_location) values("Q-Mart", "Cirencester Town");
insert into BRANCH(Branch_name, Branch_location) values("ShoppeMore", "Petersburg");
insert into BRANCH(Branch_name, Branch_location) values("Sonny & Co.", "Barmwich Lake");
insert into BRANCH(Branch_name, Branch_location) values("UniStar", "Hillford Subdivision");
insert into BRANCH(Branch_name, Branch_location) values("Randy's Wares", "Dalhurst Bluff");
insert into BRANCH(Branch_name, Branch_location) values("MiniMart", "Burnsley Hills");
insert into BRANCH(Branch_name, Branch_location) values("Fairway", "Velmond District");
insert into BRANCH(Branch_name, Branch_location) values("Vasco Express", "Middlesbough");
insert into BRANCH(Branch_name, Branch_location) values("Best-One", "South Alesbury");
insert into BRANCH(Branch_name, Branch_location) values("Saintbury's", "Garland Alley");


#CUSTOMER(​ Card​ ​ Number,​​ ​ Name,​ ​ Reward​ ​ Points,​ ​ Address,​ ​ Branch ​ ​ ID ​ )
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("ciara mae gotis", 0, "UPLB", 1);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("shandy ladera", 0, "De Lasalle", 3);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Rachelle Mae Cabigan", 0, "Ateneo", 4);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Pauline Encio", 0, "UST", 6);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Kim del Mundo", 0, "Likod ng UP", 1);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("John dela Cruz", 0, "Saan", 1);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Name Name Name", 0, "Cat Island", 2);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("nameeeeee", 0, "Di ko na alam", 5);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Peter Guillard", 0, "Middlesbough", 18);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Elton Badwick", 0, "West Boulevard", 7);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Ede Gillions", 0, "Loughswick Bay", 2);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Janice Farragher", 0, "Hillford Subdivision" 14);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Ferris Alejandre", 0, "South Alesbury" 19);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Aurore Lapping", 0, "Amarant Avenue",9);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Jessa Doonican", 0, "Burnsley Hills", 16);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Antonietta Tuckwood", 0, "Cirencester Town", 11);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Granger Triggs", 0, "Halloway Burrough", 1);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Gretna Lilleyman", 0, "West Boulevard", 7);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Maridel Ellwood", 0, "Velmond District", 17);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Sophey Farrier", 0, "Apollo Avenue", 5);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Corena Curtis", 0, "Barmwich Lake", 13);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Wallace Land", 0, "Amarant Avenue", 8);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Bartel Gatty", 0, "South Alesbury", 19);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Zora Creasy", 0, "Metropolis", 6);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Nikita Labro", 0, "Apollo Avenue", 5);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Sandy Cheeks", 0, "Bikini Bottom", 4);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Billy Kiely", 0, "Dalhurst Bluff", 15);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Aurelie Eastbury", 0, "Garland Alley", 20);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Simonne Videan", 0, "Aphrodite Square", 3);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Ciel Lewry", 0, "Middlesbough", 18);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Mellicent Gannicott", 0, "Cirencester Town", 11);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Tonya Pettwood", 0, "Hillford Subdivision", 14);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Anders Ridolfo", 0, "Falker Bridge", 8);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Hanni Stiell", 0, "Sunshine Bay", 10);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Bradly Purchon", 0, "Velmond District", 17);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Cristine Woakes", 0, "Barmwich Lake", 13);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Squidward Tentacles", 0, "Bikini Bottom", 4);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Sayre Nellen", 0, "Amarant Avenue", 9);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Kirssy Byrcher", 0, "Petersburg", 12);
insert into CUSTOMER(Customer_name, Reward_points, Address, Branch_id) values("Corrina Edland", 0, "Dalhurst Bluff", 15);

#PRODUCT(​ Product​ ​ Number,​​ ​ Product​ ​ Name,​ ​ Product​ ​ Price,​ ​ Branch ​ ​ ID ​ )
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Knees and Shoulders", 25, 1, 2);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Magic Sarap", 5.25, 4, 6);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Knorr Cubes", 10.50, 6, 0);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Crab and Corn Soup", 25, 1, 10);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Safeguard", 15, 4, 0);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Zonrox", 20, 2, 5);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Pruto anti kuto shampoo", 200, 1, 0);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Palamig", 5, 3, 2);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("PharmaCare Lens Cleaning Kit", 3.49, x, 5);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Fresh Chicken Breast Fillets", 8, x, 10);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Sweet & Juicy Nectarines", 7, 11, 8);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Connoisseur Ice Cream", 5, 20, 2);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Doritos Corn Chips", 2, 2, 12);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Nescafe Cream Blend", 10, 14, 8);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Moccona Classic Coffee", 9.15, 8, 20);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Peterson Drumsticks", 4, 10, 13);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Kettle Chips", 2.20, 7, 8);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("White Seedless Grapes", 8.90, 17, 23);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Latina Filled Pasta", 3, 13, 7);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Arnott's Crackers", 1.50, 6, 20);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Zooper Dooper Water Ice", 2.89, 9, 15);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Twinings Tea Pack", 5.49, 12, 4);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Red Rock Potato Chips", 2.25, 19, 9);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Ferrero Collection Chocolate", 7, 15, 12);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Pavlova Base", 9, 18, 14);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Jack Daniels Cola", 4.10, 4, 17);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Seafood Salad Mix", 4, 6, 9);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Global Peawn Gyoza", 6, x, 14);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Freedom Farms Breast", 8, x, 6);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Sweet Chili Tenders", 6.70, x, 1);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Family Chef Loin Steaks", 16, 17, 10);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("BBQ Thin Sausages", 7, 8, 19);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Bertocchi Traditional Ham", 11, 16, 5);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Woolworths Smoked Ribs", 10, 4, 9);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Marmalade-Glazed Pork", 8, 20, 3);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Allen's Median Biscuits", 4, 8, 2);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Cadbury Chocolate Wafer", 35, 12, 9);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Mars Medium Funsize", 3, 9, 16);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Starburst Chips", 2, 5, 16);
insert into PRODUCT(Product_name, Product_price, Branch_id, Product_stock) values("Mersey Valley Cheddar", 4.80, 14, 16);

#TRANSACTION(​ Transaction​ ​ Number,​​ ​ DateAndTime,​ ​ Payment​ ​ Cash,​ ​ Payment​ ​ Reward,​ ​ Accumulated Reward​ ​ Points,​ ​ Card ​ ​ Number, ​ ​ Branch ​ ​ ID ​ )
insert into TRANSACTION(Date_and_time, Cash_payment, Reward_point_payment, Accumulated_reward_points, Card_number, Branch_id) values('2009/07/16 08:28:01', 150, 10, 3, 1, 1);

#promo
insert into PROMOSTAR(Amount, Expire_date, Product_number, Branch_id) values(2.5, '2017/12/01', 1, 2);