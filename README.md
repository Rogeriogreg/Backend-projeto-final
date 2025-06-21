Backend Ecommerce 

Tecnologias utilizadas

- [Node.Js](https://nodejs.org/pt)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://nodemon.io/)


Rodando o Back End (Servidor)

1. Clonar o repositório do projeto
   >``git clone https://github.com/Rogeriogreg/Backend-projeto-final-.git``
2. Entrar na pasta
   >``cd ecommerce-front``
3. Instalar depedências
   >``npm install``
4. Rodar o servidor
   >``npm run dev``

Configurando o BD

1. Criar um banco de dados
2. Criar as tabelas necesárias ou gerar pelo Sequelize automaticamente
   ```
      CREATE TABLE users (
	      id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(50) NOT NULL,
         surname VARCHAR(50) NOT NULL,
         email VARCHAR(50) NOT NULL,
         password VARCHAR(100) NOT NULL,
         active INT DEFAULT(1),
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
      );

       CREATE TABLE categories (
         id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(50) NOT NULL,
         slug VARCHAR(50) NOT NULL,
         use_in_menu BOOLEAN DEFAULT 0,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
      );
   
      CREATE TABLE products (
      	id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50) NOT NULL,
          enabled BOOLEAN DEFAULT 0,
          slug VARCHAR(50) NOT NULL,
          use_in_menu BOOLEAN DEFAULT 0,
          stock INT DEFAULT 0,
          description VARCHAR(100),
          price FLOAT NOT NULL,
          price_with_discount FLOAT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE product_image (
      	id  INT PRIMARY KEY AUTO_INCREMENT,
          id_product INT,
      	FOREIGN KEY (id_product) REFERENCES products(id),
          enabled BOOLEAN DEFAULT 0,
          path VARCHAR(1000) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE products_options (
      	id INT PRIMARY KEY AUTO_INCREMENT,
          id_product INT NOT NULL,
          title VARCHAR(100) NOT NULL,
          shape ENUM('square', 'circle') DEFAULT 'square',
          radius INT DEFAULT 0,
          type ENUM('text', 'color') DEFAULT 'text',
          value VARCHAR(100) NOT NULL,
          FOREIGN KEY (id_product) REFERENCES products(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
      );
   
      CREATE TABLE categories_product (
      	id INT PRIMARY KEY AUTO_INCREMENT,
          id_product INT NOT NULL,
          id_category INT NOT NULL,
          FOREIGN KEY (id_product) REFERENCES products(id),
      	FOREIGN KEY (id_category) REFERENCES categories(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
      );
   ```
4. Criar um arquivo <b>*.env*</b> na raiz do projeto.
5. Configurar o arquivo <b>*.env*</b> com os seguintes dados:
    ```
    DATABASE= "nome-do-seu-BD"
    USER= "seu-usuario-do-bd"
    PASSWORD= "sua-senha-do-bd"
    HOST=localhost
    ```

Postman 
[Arquivo Postman](https://drive.google.com/file/d/1xGV9CDeNld2lNfEGVzz_oPcazmI1e_xe/view?usp=sharing) ↗


Status Code

- ``200 Ok``
     - A API REST realizou uma requisição com êxito.
- ``201 Create``
     - Requisição bem sucedida e um novo recurso foi criado.
- ``204 Not Content``
     - Resposta a uma solicitação PUT ou DELETE quando a API se recusa a retornar qualquer corpo de mensagem no response.
- ``400 Bad Request``
     - O Servidor não pode ou não irá processar a requisição devido a alguma coisa que foi entendido como um erro do cliente.
- ``401 Unauthorized``
     - Indica que a solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino
- ``404 Not Found``
     - Servidor não encontrou o recurso solictado.
 