import { API_URL, API_HEADERS } from '../../utils/constants';
import Api from './api';

export const api = new Api({ baseUrl: API_URL, headers: API_HEADERS });
