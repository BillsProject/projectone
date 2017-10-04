



  var ctx = document.getElementById("trendingData").getContext('2d');

  var chartData = {
      type: 'pie',
      data: {
          labels: ["education", "immigration", "healthcare", "gun control", "social security"],
          datasets: [{
              label: '#',
              data: [],
              backgroundColor: [
                  'rgba(193, 179, 142, 0.8)',
                  'rgba(209, 198, 191, 0.8)',
                  'rgba(202, 159, 146, 0.8)',
                  'rgba(227, 217, 176, 0.8)',
                  'rgba(177, 194, 122, 0.8)'

              ],
              borderColor: [
                  'rgba(255,255,255,1)',
                  'rgba(255,255,255,1)',
                  'rgba(255,255,255,1)',
                  'rgba(255,255,255,1)',
                  'rgba(255,255,255,1)'

              ],
              borderWidth: 1,
              responsive: true,
              maintainAspectRatio: true
          }]
      },
      options: {
        legend: {
        onClick: function(event, legendItem) {},
        position: "bottom"
        }
      }
    }

  // console.log(chartData.data.datasets[0].data[0])

  var trendingData = new Chart(ctx, chartData);

  var dataCount = {}


$(".searchClickMe").on("click", function() {

    event.preventDefault()

    var dataLabel = $(this).attr("data-label")

    database.ref("trendingData").push({     
      label: dataLabel
    })

})

database.ref("trendingData").on("child_added", function(snapshot, prevChildKey) {
  // console.log(snapsot.val().label)
  label = snapshot.val().label
  
  dataCount[label] = ( dataCount[label] === undefined) ? 1 : dataCount[label] + 1

  var keysSorted = Object.keys(dataCount).sort(function(a,b){return dataCount[b]-dataCount[a]})
  var topLabels = [keysSorted[0], keysSorted[1], keysSorted[2], keysSorted[3], keysSorted[4]]
  var topData = [dataCount[keysSorted[0]], dataCount[keysSorted[1]], dataCount[keysSorted[2]], dataCount[keysSorted[3]], dataCount[keysSorted[4]]]

  chartData.data.labels = topLabels
  
  chartData.data.datasets[0].data = topData
  trendingData.update()
  

}, function(errorObject){ 
  console.log("The read failed: " + errorObject.code)

});


