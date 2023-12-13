<nav class="flex justify-around text-white bg-black items-center">
    <h2 class="text-2xl font-thin mb-2">
        Customer Segmentation
    </h2>
    <ul class="flex items-center justify-evenly">
        <li>Home</li>
        <li>About</li>
    </ul>
</nav>

<style>
    nav{
        height: 4rem;
    }
    ul{
        width: 50%;
    }

    h2{
        transition: all 0.2s ease-in;
        letter-spacing: 0.7rem;
    }
    h2:hover{
        cursor: pointer;
        letter-spacing: 0.9rem;
    }
    li{
        transition: border-color 0.5s ease;
    }
    li:hover{
        border-bottom: 2px solid orange;
        cursor: pointer;
    }
</style>