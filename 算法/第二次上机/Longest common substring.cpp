#include<iostream>
#include<string.h>
using namespace std;

//dp[i][j]:��(x1,x2,...,xi)�봮(y1,y2,...,yj)��
//d[i][j]��ʾ������������������Ӵ���β��ͬʱ��������Ӵ��ĳ���

//״̬ת�Ʒ������£� 
//��i=0��j=0����dp[i][j] = 0
//����
//		��A[i]==B[j]����dp[i][j] = dp[i-1][j-1] + 1
//		��A[i]!=B[j]����dp[i][j] = 0


//���ڴ�ӡ�ĺ�����������õ� 
void print_substring(string str, int end, int length)
{
	int start = end - length + 1;
	for (int k = start; k <= end; k++)
		cout << str[k];
	cout << endl;
}

int main()
{
	string A, B;
	cin >> A >> B;
	int x = A.length();
	int y = B.length();
	A = " " + A;//���⴦��һ�£����ڱ�� 
	B = " " + B;

	int** dp = new int* [x + 1];
	int i, j;
	for (i = 0; i <= x; i++)
	{
		dp[i] = new int[y + 1];
		for (j = 0; j <= y; j++)
			dp[i][j] = 0;
	}


	//�������dp[i][j]��ֵ����¼���ֵ 
	int max_length = 0;
	for (i = 1; i <= x; i++)
		for (j = 1; j <= y; j++)
			if (A[i] == B[j])
			{
				dp[i][j] = dp[i - 1][j - 1] + 1;
				if (dp[i][j] > max_length)
					max_length = dp[i][j];
			}
			else
				dp[i][j] = 0;


	//LCS�ĳ����Ѿ�֪���ˣ������Ǹ��������󳤶Ⱥ�dp[][]��ֵ��
	//�ҵ���Ӧ�� LCS�����Ӵ��� ע�⣺�����ж�� 
	int const arr_length = (x > y ? x : y) + 1;
	int end_A[arr_length];	//��¼LCS���ַ���A�н�����λ�� 
	int num_max_length = 0;	//��¼LCS�ĸ��� 

	for (i = 1; i <= x; i++)
		for (j = 1; j <= y; j++)
			if (dp[i][j] == max_length)
				end_A[num_max_length++] = i;

	cout << "the length of LCS(substring) is : " << max_length << endl << " nums: " << num_max_length << endl << "they are (it is): " << endl;
	for (int k = 0; k < num_max_length; k++)	//���ÿ��������Ӵ� 
		print_substring(A, end_A[k], max_length);

	return 0;
}