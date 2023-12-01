<script>
	import { page } from '$app/stores';
	import Age_Spending_Score_Elbow from '$lib/Images/Age&SpendingScoreElbow.png';
	import Silhoutte_Age_Spending from '$lib/Images/Silhouette(Age&SpendingScore).png';
	import Vornoi_Age_SS from '$lib/Images/Vornoi(Age&SpendingScore).png';
	import Silhoutte_Annual_Spending from '$lib/Images/Silhouette(Annual Income vs Spending Score).png'
	import Vornoi_Annual_SS from '$lib/Images/Vornoi(Spending Score&Annual Income).png'
	// 3rd cluster
	import Silhoutte_Age_Annual_Spending from '$lib/Images/Silhouette(Annual Income vs Spending Score vs Age).png'
	import { tick } from 'svelte';
	export let data;

    let Age, Spending_Score;
    let label = false;
	let SegmentationUsingAnnualSS = {
		Annual_income: 30,
		SS : 30,
		label : true,
		GetLabel : function(){
			console.log('Annual: ', this.Annual_income)
			if(this.Annual_income<55 && this.SS<50){
				console.log('C1')
				return 'Cluster-1'
			}
			else if (this.Annual_income > 55 && this.SS<50){
				console.log('c4')
				return 'Cluster-4'

			}
			else if(this.Annual_income<55 && this.SS>50){
				console.log('C5')
				 return 'Cluster-5'
			}
			else if(this.Annual_income>55 && this.SS>60){
				console.log('c3')
				return 'Cluster-3'
			}
			else if((this.Annual_income >35 && this.Annual_income<80) &&(this.SS>20 && this.SS<80)){
				console.log('c2')
				return 'Cluster-2'
			}
			
		}
	}
    function GetLabel(){
        if(Spending_Score<33){

            label='Cluster-2'
            
        }
        else if(Age <42 && Spending_Score >= 30 && Spending_Score <= 64){
            label='Cluster-3'
        }
        else if(Age>43 && Spending_Score>33 && Spending_Score<=68){
            label='Cluster-0'
        }
        else if(Spending_Score>68){
            label='Cluster-1'
        }
        Age = Spending_Score = false
    }
</script>

<header>
	<h1 class="text-3xl text-center text-zinc-600">K-Means Clustering</h1>
	<section class="mx-auto">
		<p class="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">
			K-means clustering is a simple but powerful algorithm used in data analysis and machine
			learning to group similar data points together. Imagine you have a collection of objects, and
			you want to divide them into groups based on their similarities. K-means can help with that.
		</p>
	</section>
	<h1 class="text-3xl text-center text-zinc-500">DataSet</h1>
</header>

<!-- Table -->

<div class="flex items-center justify-center">
	<div class="w-2/3">
		<table
			class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden"
		>
			<thead class="bg-gray-50">
				<tr>
					{#each Object.keys(data['csv_data']) as i}
						<th
							class="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
							>{i}</th
						>
					{/each}
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each Object.keys(data['csv_data']['Age']).slice(0, 10) as i (i)}
					<tr>
						<td class="px-6 py-4 whitespace-no-wrap border-l">{data['csv_data']['Genre'][i]}</td>
						<td class="px-6 py-4 whitespace-no-wrap border-l">{data['csv_data']['Age'][i]}</td>
						<td class="px-6 py-4 whitespace-no-wrap border-l"
							>{data['csv_data']['Annual Income (k$)'][i]}</td
						>
						<td class="px-6 py-4 whitespace-no-wrap border-l"
							>{data['csv_data']['Spending Score (1-100)'][i]}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- Case-1:- Segmentation using age and spending score-->
<div
	class="bg-gray-70 p-4 rounded-lg shadow-md mx-auto mt-2 transition-transform hover:shadow-lg hover:bg-gray-100"
	style="width: 90%;"
>
	<!-- Content for your centered and rounded card goes here -->
	<h2 class="text-3xl text-center text-zinc-600">
		Case-1:- Segmentation Using Age And Spending Score
	</h2>
	<aside class="grid grid-cols-3">
		<article class="col-span-3">
			<p class="mb-3 text-lg text-gray-800 md:text-xl">
				Here we have <span class="font-bold">Age</span> and
				<span class="font-bold">Spending Score</span>
				as Input Features since we don't have our label <span class="font-bold">Y</span> we have to
				look at what common patterns does Features of X emerge to be.
				<br />
				First, Try to find Optimal Number of Clusters via:
			</p>
			<h3 class="text-center text-3xl">
				<em>1)Silhouette Score</em>
			</h3>
			<h3 class="text-center text-2xl">
				<em>2)Elbow Method</em>
			</h3>
		</article>

		<article class="col-span-3">
			<img src={Age_Spending_Score_Elbow} alt="" />
		</article>

		<article class="col-span-1 flex items-center bg-black art1">
			<p class="mb-3 text-lg md:text-xl text-white">
				We prefer to use Silhouette Score across the project as Elbow method is quite subjective to
				the Observer.
			</p>
		</article>
		<article class="col-span-2">
			<img src={Silhoutte_Age_Spending} alt="" srcset="" />
		</article>

		<article class="col-span-3 optimaltext mx-auto m-2">
            <p class="mb-3 text-lg md:text-xl mx-auto mt-2">
				Our optimal number of clusters is the number where siloutte score is maximum, i.e at 4 
                our Silhouette score is maximum, so optimal number of clusters are 4
			</p>
        </article>
        <article class="col-span-3 bg-lime-200 py-2">
            <img src={Vornoi_Age_SS} class="mx-auto"/>
        </article>
        
        <article class="col-span-3">

            <div class="max-w-md mx-auto mt-8">
                <form class="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto" on:submit|preventDefault={GetLabel}>
                  <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="age">
                      Enter Age
                    </label>
                    <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="age"
                      type="number"
                      placeholder="Age"
                      min="20"
                      bind:value={Age}
                    />
                  </div>

                  <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="ss">
                      Spending Score(1-100)
                    </label>
                    <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="ss"
                      type="number"
                      placeholder="Spending Score"
                      min="0"
                      max='100'
                      bind:value={Spending_Score}
                    />
                  </div>


                  <div class="flex items-center justify-between">
                    <button
                      class="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
                      type="submit"
                    >
                      Predict
                    </button>
                  </div>
                </form>
              </div>
        </article>
        {#if true}
        <article class="col-span-3 text-center text-purple-700 font-bold">
            <p class="mx-auto ">The Customer belongs to {label}</p>
        </article>
        {/if}
    </aside>
</div>

<hr>
<!-- case-2 where We have Annual Income vs Spending Score -->

<div
	class="bg-gray-70 p-4 rounded-lg shadow-md mx-auto mt-4 transition-transform hover:shadow-lg hover:bg-gray-100"
	style="width: 90%;"
>
<h2 class="text-3xl text-center text-zinc-600">
	Case-2:- Segmentation Using Annual Income And Spending Score
</h2>
<aside class="grid grid-cols-4 gap-2">
	<article class="col-span-4">
		<p class="mb-3 text-lg text-gray-800 md:text-xl">
			Here we have <span class="font-bold">Annual Income</span> and
			<span class="font-bold">Spending Score</span>
			as Input Features since we don't have our label <span class="font-bold">Y</span> we have to
			look at what common patterns does Features of X emerge to be.
			<br />
			First, Try to find Optimal Number of Clusters via: Silhouette Score
		</p>
	</article>
	<article class="col-span-2 bg-pink-200">
		<img src={Silhoutte_Annual_Spending} class="border border-red-500"/>
	</article>
	<article class="col-span-2">
		<img src={Vornoi_Annual_SS} class="border border-red-500 h-full"/>
	</article>

	<article class="col-span-4">
		<div class="max-w-md mx-auto mt-8">
			<form class="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto" on:submit|preventDefault={SegmentationUsingAnnualSS['GetLabel']}>
			  <div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="annual">
				  Annual Income
				</label>
				<input
				  class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
				  id="annual"
				  type="number"
				  placeholder="Annual Income"
				  min="0"
				  bind:value={SegmentationUsingAnnualSS['Annual_income']}
				/>
			  </div>

			  <div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="ss">
				  Spending Score(1-100)
				</label>
				<input
				  class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
				  id="ss"
				  type="number"
				  placeholder="Spending Score"
				  min="0"
				  max='100'
				  bind:value={SegmentationUsingAnnualSS['SS']}
				/>
			  </div>


			  <div class="flex items-center justify-between">
				<button
				  class="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
				  type="submit"
				>
				  Predict
				</button>
			  </div>
			</form>
		  </div>
		  {#if SegmentationUsingAnnualSS['GetLabel']()}
			  <article class="col-span-3 text-center text-purple-700 font-bold">
				  <p class="mx-auto ">The Customer belongs to {SegmentationUsingAnnualSS['GetLabel']()}</p>
			  </article>
			  {/if}
	</article>


</aside>
</div>

<!-- Case-3 Where we have Annual Income, SPending socre, Age -->


<div
	class="bg-gray-70 p-4 rounded-lg shadow-md mx-auto mt-4 transition-transform hover:shadow-lg hover:bg-gray-100"
	style="width: 90%;"
>
<h2 class="text-3xl text-center text-zinc-600">
	Case-3:- Segmentation Using Annual Income And Spending Score And Age
</h2>
<aside class="grid grid-cols-4 gap-2">
	<article class="col-span-4">
		<p class="mb-3 text-lg text-gray-800 md:text-xl">
			Here we have <span class="font-bold">Annual Income</span> and
			<span class="font-bold">Spending Score</span> & <span class="font-bold">Age</span>
			as Input Features since we don't have our label <span class="font-bold">Y</span> we have to
			look at what common patterns does Features of X emerge to be.
			<br />
			First, Try to find Optimal Number of Clusters via: Silhouette Score
		</p>
	</article>
	<article class="col-span-4 bg-purple-400 p-2">
		<img src={Silhoutte_Age_Annual_Spending} class=" mx-auto w-2/3 "/>
	</article>

	<article class="col-span-4">
		<h1 class="text-3xl text-center underline text-blue-600">
			<a href="https://wonderful-sopapillas-886153.netlify.app/">Please Visit this Link for better 3D illustration</a>
		</h1>
	</article>


</aside>
</div>







<style>
	/* @import url('https://fonts.googleapis.com/css2?family=Cuprum:ital@1&family=Roboto:ital,wght@0,400;1,500&display=swap'); */
	@import url('https://fonts.googleapis.com/css2?family=Cuprum:ital@1&family=Roboto&display=swap');
	h2 {
		font-family: 'Roboto';
	}
	section {
		width: 80%;
	}
	.art1 {
		transition: all 0.3s ease-in;
	}
	.art1:hover {
		border-radius: 10%;
	}
	.art1 p {
		padding: 10%;
		transition: all 0.3s ease-in-out;
	}
	.art1:hover p {
		padding: 20%;
	}
    .optimaltext{
        background-color: blanchedalmond;
        width: 80%;
        transition: all 0.4s ease-in-out;
    }
    .optimaltext:hover{
        background-color: transparent;
    }
    .optimaltext:hover p{
        border-radius: 10%;
        padding: 1.2rem;
        background-color: blanchedalmond;
    }
    .optimaltext p{
        transition: all 0.3s ease-in;
        width: 50%;
    }
	
</style>
