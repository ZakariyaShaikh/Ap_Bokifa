USE ap_bokifa;

drop procedure if exists sp_create_user;

delimiter $$

create procedure sp_create_user (in p_name varchar(150) , in p_email varchar(255) ,in p_password varchar(255) , in p_role enum("customer" , "admin" ) )

begin 
	insert into users (name , email , password , role ) 
    values(p_name , p_email , p_password , p_role ) ;
    
    select id ,name , email , role , is_varified, must_change_password ,created_at
    from users where id =last_insert_id();
end $$ 

delimiter ;