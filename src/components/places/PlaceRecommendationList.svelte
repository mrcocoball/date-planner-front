<script>
  import { onDestroy } from 'svelte'
  import { placeRecommendations, placeDetail, requestPath, currentPlacePaginationBar, currentPlacesPage } from '../../store/places/placeStore'
  import PlaceRecommendation from './PlaceRecommendation.svelte';
  import PlaceDetail from './PlaceDetail.svelte';

  let detailMode = false
  let searchMode = false
  let bookmarkSearchMode = false

  let initValues = {
    formRegion1: '',
    formRegion2: ''
  }

  let region1s = ["강원","경기","경남","경북","광주","대구","대전","부산","서울","울산","인천","전남","전북","제주","충남","충북"]

  let region2s = [
    ["강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"],
    ["고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"],
    ["거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"],
    ["경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"],
    ["광산구","남구","동구","북구","서구"],
    ["남구","달서구","동구","북구","서구","수성구","중구","달성군"],
    ["대덕구","동구","서구","유성구","중구"],
    ["강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"],
    ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"],
    ["남구","동구","북구","중구","울주군"],
    ["계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"],
    ["광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"],
    ["군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"],
    ["서귀포시","제주시","남제주군","북제주군"],
    ["계룡시","공주시","논산시","당진시","보령시","서산시","아산시","천안시","금산군","부여군","서천군","예산군","청양군","태안군","홍성군"],
    ["제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"]
  ]

  let region2btns = []
  let selectedRegion1 = ''
  let selectedRegion2 = ''

  const setRegion1 = (region1, index) => {
    initValues.formRegion1 = region1
    initValues.formRegion2 = ''
    selectedRegion1 = index.toString()
    selectedRegion2 = ''
    region2btns = region2s[index]
  }

  const setRegion2 = (region2, index) => {
    if (selectedRegion2 != index) {
      initValues.formRegion2 = region2
      selectedRegion2 = index.toString()
    } else {
      initValues.formRegion2 = ''
      selectedRegion2 = ''
    }
  }

  const searchPlaceRecommendations = async () => {
    try {
      await placeRecommendations.fetchPlaces(initValues.formRegion1, initValues.formRegion2)
      searchMode = true
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const setPage = async (pageNum) => {
    try {
      await placeRecommendations.fetchPlacesByPage($requestPath, pageNum)
      let element = document.getElementById("main_nav")
      element.scrollIntoView();
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onDetailMode = (place_id) => {
    detailMode = true
    goPlaceDetail(place_id)
  }

  // 하위 컴포넌트인 PlaceDetail에서 이벤트 전달 받음
  const offDetailMode = (event) => {
    detailMode = false
    placeDetail.resetPlace()
  }

  const goPlaceDetail = async (place_id) => {
    try {
      await placeDetail.getPlace(place_id.toString())
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  onDestroy(() => {
    requestPath.set('')
    placeRecommendations.resetPlaces()
    placeDetail.resetPlace()
    currentPlacePaginationBar.resetPaginationBar()
    currentPlacesPage.resetPage()
    searchMode = false
  })

</script>

{#key detailMode}
{#if detailMode}
<div class="place-detail">
  {#if $placeDetail}
    <PlaceDetail {placeDetail} {bookmarkSearchMode} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}
<div class="place-search-form">
  <div class="place-search-form-header">
    <h2>추천 장소 검색하기</h2>
    <span>지역을 선택하면 평점순 상위 50위까지의 장소를 확인할 수 있습니다!</span>
  </div>
  <div class="place-search-bar-region1">
    <div class="place-search-bar-region1-labels">
      {#each region1s as region1, index}
      <label on:click={() => setRegion1(region1, index)} class={selectedRegion1 != '' && index === Number(selectedRegion1) ? 'region1-selected' : 'region1'}>{region1}</label>
      {/each}
    </div>
  </div>
  <div class="place-search-bar-region2">
    <div class="place-search-bar-region2-labels">
      {#each region2btns as region2, index}
      <label on:click={() => setRegion2(region2, index)} class={selectedRegion2 != '' && index === Number(selectedRegion2) ? 'region2-selected' : 'region2'}>{region2}</label>
      {/each}
    </div>
  </div>
  <div class="detail-top-button">
    <button class="w-100 btn btn-search" on:click={searchPlaceRecommendations}>검색하기</button>
  </div>
</div>

<div class={searchMode ? "place-information" : "place-information-empty"}>
{#if searchMode}
<div class="place-recommendation-list">
  {#each $placeRecommendations.data.content as place, index}
  <ul class="list-group">
    <li class="list-group-item place-thumb-item" on:click={() => onDetailMode(place.place_id)}>
      <PlaceRecommendation {place} {index} />
    </li>
  </ul>
  {/each}
</div>
  <nav id="pagination" aria-label="Page navigation">
    <div class="place-pagination">
      <ul class="pagination justify-content-center">
        {#each $currentPlacePaginationBar as pageButton}
          <li class={pageButton === $currentPlacesPage ? "page-item active" : "page-item"} aria-current="page">
            <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
{/if}
</div>
{/if}
{/key}