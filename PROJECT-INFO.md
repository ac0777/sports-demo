# sports-demo

## Overview

This project displays all sports leagues provided by the API. It also provides filterling by sport and a search feature that searches through the leagues based on the selected sport. on league click, new page is rendered displaying 
all of the seasons for that League.

## Code Structure

 ### Router
 We have incorporated a router that handles the navigation from Home Page to Season Page. The router uses lazy loading for the Seasons Page.
 
 ### Views
 We have 2 pages:
  - HomeView.vue - This one is the landing page. it holds the FiltersBar.vue and the LeagueList.vue components. It also handles the filtering logic for the Leagues data
   - LeagueBadgesView.vue - This one is essentially the Seasons page. Uses can go to this page by clicking on any league in the HomeView

 ### Components
 We have 4 components here:
  - LeagueList.vue - This component holds all the leagues [LeagueItem components] that need to be displayed based on the selected sport + search filter
  - LeagueItem.vue - This component shows all info for a specific League like Name, Sport and Alt. This is a clickable component, and when clicked it takes the user to the Seasons page.
  - FiltersBar.vue - This component holds the search bar and sports dropdown. On every change it emits proper events atht are handled inside of the HomeView.vue page.
  - LeagueBadge.vue - Holds info about single Season [Name, Icon if applicable]

  ### Composables
  We have 2 composables added:
   - useLeagues.ts - this composable holds the logic for fetching the leagues data as well as retrieving all unique sports from the initial response. it also handles the loading state.
    - useLeagueSeasons.ts - similar to useLeagues, this wane handles the data fetching for seasons in a league. it also handles the loading logic for this.

  ### Utils
  We have the caching code here. This small file helps us preserve the response data so to avoid repeat calls. We used ChatGPT to simplify the code here and improve performance.

  ### Unit Tests
  We have added a few unit tests for all of the components as well as the composables to improve code stability and reliability.


# Tools Used
 - Code was developed in VSCode IDE
 - We used Vue3 + Composition API for the SPA
 - ViTest was used for the unit tests
 - VueRouter for the routing + lazy loading
 - ChatGPT for consulting on the response caching logic