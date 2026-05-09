import { expect, describe, test, beforeEach } from 'vitest';
import { getHeroesByPageAction } from './get-heroes-by-page.action';
import AxiosMockAdapter from 'axios-mock-adapter';
import { heroApi } from '../api/hero.api';

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

describe('getHeroesByPageAction', () => {

    const heroesApiMock = new AxiosMockAdapter(heroApi);

    beforeEach(() => {
        heroesApiMock.reset();
        // heroesApiMock.resetHistory();
    });

    test('should return default heroes', async () => {
        // Mock API response
        heroesApiMock.onGet('/').reply(200, {
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: '1.pjeg'
                },
                {
                    image: '2.jpeg'
                }
            ]
        })

        // Test implementation
        const response = await getHeroesByPageAction(1);
        // console.log({ response })

        expect(response).toStrictEqual({
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: `${BASE_URL}/images/1.pjeg`
                },
                {
                    image: `${BASE_URL}/images/2.jpeg`
                }
            ]
        })

    });


    test('should return the correct heroes when page is not a number', async () => {

        const respondeObject = {
            total: 10,
            pages: 2,
            heroes: []
        }
        // Mock API response
        heroesApiMock.onGet('/').reply(200, respondeObject)

        heroesApiMock.resetHistory();

        await getHeroesByPageAction('not-a-number' as unknown as number);
        // console.log({ response })
        const params = heroesApiMock.history.get[0].params;


        expect(params).toStrictEqual({
            limit: 6,
            offset: 0,
            category: 'all'
        })

    });

    test('should return the correct heroes when page is a string number', async () => {

        const respondeObject = {
            total: 10,
            pages: 1,
            heroes: []
        }
        // Mock API response
        heroesApiMock.onGet('/').reply(200, respondeObject)

        heroesApiMock.resetHistory();

        await getHeroesByPageAction('5' as unknown as number);
        // console.log({ response })
        const params = heroesApiMock.history.get[0].params;


        expect(params).toStrictEqual({
            limit: 6,
            offset: 24,
            category: 'all'
        })

    });


    test('should call the api with the correct params', async () => {

        const respondeObject = {
            total: 10,
            pages: 1,
            heroes: []
        }
        // Mock API response
        heroesApiMock.onGet('/').reply(200, respondeObject)

        heroesApiMock.resetHistory();

        await getHeroesByPageAction(2, 10, 'heroes');

        const params = heroesApiMock.history.get[0].params;
        console.log({ params })

        expect(params).toStrictEqual({
            limit: 10,
            offset: 10,
            category: 'heroes'
        })

    });

});