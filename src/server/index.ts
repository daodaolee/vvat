// 所有接口
import http from "./http";
export async function test(params: object) {
  const res = await http.get(
    `http://192.168.16.159:8200/guide-common/api/common/function/searchTopSysFunction`,
    params
  );
  return res;
}
