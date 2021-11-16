<%- include('../includes/head.ejs') %>

    </head>

    <body>

        <%- include('../includes/navigation.ejs') %>

            <main>
       
			<section>
				<div class="container initial">
					<h1 class="searchTitle">Recipe Search</h1>
					<form>
						<input
							class="searchInput"
							type="text"
							aria-label="Search"
							placeholder="Enter An Ingridient for Recipe Suggestions ..."
						/>
						<ion-icon name="search"></ion-icon>
					</form>
					<div class="search-result"></div>
					</div>
			</section>
     
    </main>

    <%- include('../includes/end.ejs') %>
