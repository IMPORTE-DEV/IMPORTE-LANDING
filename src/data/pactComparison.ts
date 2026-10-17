// 생성 파일 — 손으로 고치지 않는다.
// Pact: muratkeremozcan/pact-js-example-react-consumer @77a4667 의 소비자 테스트를 실행해 만든 pacts/ReactConsumer-MoviesAPI-bi-directional.json
// IMPORTE: 같은 커밋을 IMPORTE fe-analyzer(타입 선언 받기 포함)로 분석한 결과
export const pactComparison = {
  'GET /movies/{id}': {
    method: 'GET',
    path: '/movies/{id}',
    anchors: [
      {
        file: 'src/consumer.ts',
        line: 63,
        symbol: 'getMovieById',
      },
    ],
    request: [
      {
        name: 'path.id',
        type: 'number',
      },
      {
        name: 'header.Authorization',
        type: 'string',
      },
    ],
    body: [],
    response: [
      {
        path: 'data.director',
        type: 'string',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-details/movie-edit-form.tsx',
          line: 32,
          symbol: 'MovieEditForm',
        },
      },
      {
        path: 'data.id',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-item/movie-info.tsx',
          line: 11,
          symbol: 'MovieInfo',
        },
      },
      {
        path: 'data.name',
        type: 'string',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-details/movie-edit-form.tsx',
          line: 32,
          symbol: 'MovieEditForm',
        },
      },
      {
        path: 'data.rating',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-details/movie-edit-form.tsx',
          line: 32,
          symbol: 'MovieEditForm',
        },
      },
      {
        path: 'data.year',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-details/movie-edit-form.tsx',
          line: 32,
          symbol: 'MovieEditForm',
        },
      },
      {
        path: 'error.error',
        type: null,
        notInType: true,
        usedAt: {
          file: 'src/components/movie-details/movie-details.tsx',
          line: 33,
          symbol: 'MovieDetails',
        },
      },
    ],
    pact: [
      {
        description: 'a request to a specific movie',
        given: ['Has a movie with a specific ID'],
        status: 200,
        query: [],
        headers: [],
        requestBody: [],
        response: [
          ['data.director', '"John Doe"'],
          ['data.id', '100'],
          ['data.name', '"My movie"'],
          ['data.rating', '8.5'],
          ['data.year', '1999'],
          ['status', '200'],
        ],
      },
    ],
  },
  'GET /movies': {
    method: 'GET',
    path: '/movies',
    anchors: [
      {
        file: 'src/consumer.ts',
        line: 57,
        symbol: 'getMovies',
      },
      {
        file: 'src/consumer.ts',
        line: 71,
        symbol: 'getMovieByName',
      },
    ],
    request: [
      {
        name: 'query.name',
        type: 'string',
      },
      {
        name: 'header.Authorization',
        type: 'string',
      },
    ],
    body: [],
    response: [
      {
        path: 'data.director',
        type: 'string',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-details/movie-edit-form.tsx',
          line: 32,
          symbol: 'MovieEditForm',
        },
      },
      {
        path: 'data.id',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-item/movie-info.tsx',
          line: 11,
          symbol: 'MovieInfo',
        },
      },
      {
        path: 'data.name',
        type: 'string',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-details/movie-edit-form.tsx',
          line: 32,
          symbol: 'MovieEditForm',
        },
      },
      {
        path: 'data.rating',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-details/movie-edit-form.tsx',
          line: 32,
          symbol: 'MovieEditForm',
        },
      },
      {
        path: 'data.year',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-details/movie-edit-form.tsx',
          line: 32,
          symbol: 'MovieEditForm',
        },
      },
      {
        path: 'data[*].director',
        type: 'string',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-item/movie-item.tsx',
          line: 19,
          symbol: 'MovieItem',
        },
      },
      {
        path: 'data[*].id',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-item/movie-item.tsx',
          line: 18,
          symbol: 'MovieItem',
        },
      },
      {
        path: 'data[*].name',
        type: 'string',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-item/movie-item.tsx',
          line: 19,
          symbol: 'MovieItem',
        },
      },
      {
        path: 'data[*].rating',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-item/movie-item.tsx',
          line: 19,
          symbol: 'MovieItem',
        },
      },
      {
        path: 'data[*].year',
        type: 'number',
        notInType: false,
        usedAt: {
          file: 'src/components/movie-item/movie-item.tsx',
          line: 19,
          symbol: 'MovieItem',
        },
      },
      {
        path: 'error.error',
        type: null,
        notInType: true,
        usedAt: {
          file: 'src/components/movie-details/movie-details.tsx',
          line: 33,
          symbol: 'MovieDetails',
        },
      },
    ],
    pact: [
      {
        description: 'a request to get a movie by name',
        given: ['An existing movie exists'],
        status: 200,
        query: ['name'],
        headers: [],
        requestBody: [],
        response: [
          ['data.director', '"John Doe"'],
          ['data.id', '1'],
          ['data.name', '"My movie"'],
          ['data.rating', '8.5'],
          ['data.year', '1999'],
          ['status', '200'],
        ],
      },
      {
        description: 'a request to get all movies',
        given: ['An existing movie exists'],
        status: 200,
        query: [],
        headers: [],
        requestBody: [],
        response: [
          ['data[*].director', '"John Doe"'],
          ['data[*].id', '1'],
          ['data[*].name', '"My movie"'],
          ['data[*].rating', '8.5'],
          ['data[*].year', '1999'],
          ['status', '200'],
        ],
      },
      {
        description: 'a request to get all movies',
        given: ['No movies exist'],
        status: 200,
        query: [],
        headers: [],
        requestBody: [],
        response: [
          ['data[*]', '[]'],
          ['status', '200'],
        ],
      },
    ],
  },
  'POST /movies': {
    method: 'POST',
    path: '/movies',
    anchors: [
      {
        file: 'src/consumer.ts',
        line: 80,
        symbol: 'addMovie',
      },
    ],
    request: [
      {
        name: 'header.Authorization',
        type: 'string',
      },
    ],
    body: [
      {
        name: 'body.director',
        type: 'string',
      },
      {
        name: 'body.name',
        type: 'string',
      },
      {
        name: 'body.rating',
        type: 'number',
      },
      {
        name: 'body.year',
        type: 'number',
      },
    ],
    response: [],
    pact: [
      {
        description: 'a request to add a new movie',
        given: ['No movies exist'],
        status: 200,
        query: [],
        headers: ['Content-Type'],
        requestBody: ['director', 'name', 'rating', 'year'],
        response: [
          ['data.director', '"John Doe"'],
          ['data.id', '101'],
          ['data.name', '"New movie"'],
          ['data.rating', '8.5'],
          ['data.year', '1999'],
          ['status', '200'],
        ],
      },
      {
        description: 'a request to the existing movie',
        given: ['An existing movie exists'],
        status: 409,
        query: [],
        headers: ['Content-Type'],
        requestBody: ['director', 'name', 'rating', 'year'],
        response: [['error', '"Movie New movie already exists"']],
      },
    ],
  },
  'PUT /movies/{id}': {
    method: 'PUT',
    path: '/movies/{id}',
    anchors: [
      {
        file: 'src/consumer.ts',
        line: 99,
        symbol: 'updateMovie',
      },
    ],
    request: [
      {
        name: 'path.id',
        type: 'number',
      },
      {
        name: 'header.Authorization',
        type: 'string',
      },
    ],
    body: [
      {
        name: 'body.director',
        type: 'string',
      },
      {
        name: 'body.name',
        type: 'string',
      },
      {
        name: 'body.rating',
        type: 'number',
      },
      {
        name: 'body.year',
        type: 'number',
      },
    ],
    response: [],
    pact: [
      {
        description: 'a request to update a specific movie',
        given: ['Has a movie with a specific ID'],
        status: 200,
        query: [],
        headers: ['Content-Type'],
        requestBody: ['director', 'name', 'rating', 'year'],
        response: [
          ['data.director', '"Steven Spielberg"'],
          ['data.id', '99'],
          ['data.name', '"Updated movie"'],
          ['data.rating', '8.5'],
          ['data.year', '2000'],
          ['status', '200'],
        ],
      },
    ],
  },
  'DELETE /movies/{id}': {
    method: 'DELETE',
    path: '/movies/{id}',
    anchors: [
      {
        file: 'src/consumer.ts',
        line: 89,
        symbol: 'deleteMovieById',
      },
    ],
    request: [
      {
        name: 'path.id',
        type: 'number',
      },
      {
        name: 'header.Authorization',
        type: 'string',
      },
    ],
    body: [],
    response: [],
    pact: [
      {
        description: 'a request to delete a movie that exists',
        given: ['Has a movie with a specific ID'],
        status: 200,
        query: [],
        headers: [],
        requestBody: [],
        response: [
          ['message', '"Movie 200 has been deleted"'],
          ['status', '200'],
        ],
      },
      {
        description: 'a request to delete a non-existing movie',
        given: [],
        status: 404,
        query: [],
        headers: [],
        requestBody: [],
        response: [
          ['error', '"Movie with ID 123456789 not found"'],
          ['status', '404'],
        ],
      },
    ],
  },
} as const
