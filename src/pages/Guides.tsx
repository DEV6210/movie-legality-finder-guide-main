
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, CheckCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { searchMovies, SearchResult } from "@/utils/api";
import { Input } from "@/components/ui/input";

// Platform data
const platforms = [
  {
    id: "netflix",
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/120px-Netflix_2015_logo.svg.png",
  },
  {
    id: "prime",
    name: "Amazon Prime",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/120px-Amazon_Prime_Video_logo.svg.png",
  },
  {
    id: "disney",
    name: "Disney+ Hotstar",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Disney%2B_Hotstar_logo.svg/120px-Disney%2B_Hotstar_logo.svg.png",
  },
  {
    id: "jio",
    name: "JioCinema",
    logo: "data:image/png;base64,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",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/120px-YouTube_full-color_icon_%282017%29.svg.png",
  },
  {
    id: "sony",
    name: "SonyLIV",
    logo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBEQACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBQYHBAj/xABPEAABAwMBAwYJBwgHBwUAAAABAAIDBAURBgcSIRMxQVFhkRQVIlRxgZOx0SMyNlJTcsEIJkJidKGisiQlM0NzwtIXNWSDkpThFkRVY4L/xAAbAQACAwEBAQAAAAAAAAAAAAAAAwECBAUGB//EADkRAAIBAgMFBQcCBgIDAAAAAAABAgMRBAUSEyExUXE0QVKBkQYUIjIzocFh0RUkQmKx8CPhJVNy/9oADAMBAAIRAxEAPwDcHENaXOIAAySehHQDBtp+1GpdVSW2ySvjiZwc9rsb3afh3rS0qKtxkLV59DJp7zcpnF762YE8fJduj9yW61R95bRHkN+M7h59U+1d8VG1qc36k6Y8geM7h59U+1d8UbWpzfqGmPIHjO4efVPtXfFG1qc36hpjyB4zuHn1T7V3xRtanN+oaY8geM7h59U+1d8UbWpzfqGmPIHjO4efVPtXfFG1qc36hpjyB4zuHn1T7V3xRtKnN+oaY8gvGVf57U+1d8UbSpzfqFlyB4zr/Pqn2rvijaVOb9QsgeMq/wA9qfau+KNpU5v1JD8Z1/ntT7UqNpU5v1AHjOv89qPaFG0nzfqAPGdf57Ue0KNpPm/UAeM6/wA9qPaFG0nzfqAPGdf57Ue0KNpPm/UAeM6/z2o9oUbSfN+oA8Z1/ntR7Qo2k+b9QB4zr/Paj2hRtJ836gDxnX+e1HtCjaT5v1AHjOv89qfauU7SfifqBLWPV15tFUyenrZfJ6nYPf0+g5Csqr/q3hc9H7ONZw6ste8/Aq4x8oBwDu3HvUVYJfFDgBcRzJQEDreqdR6Xr5Y+B5Pdz1Z4H9ydQjeoilR/CzyJVPfLPJI9xc57iSfWrVFdtssuFjnKQ0SEoACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACADCANH2HV81Lq2OBh8iXAI7CnU99OSJR6aCSQVraL9D6/7o960YX6qF1PlPJkjeJ9a0TgTFjDgssolxJSmgCUAHg9SABhAAwgAkAGgAkAHgoAJAB4KACQAEABAB4QASADwUAEgAIAPCACQBfNjH00pfvD3p9L5ZdAPU6QBWdoYzpGu+6PetWCV6yQmu7QueUZW8V0akCbjDmrHOBdMbLVmlEsWrRmz2/wCrhytvgZFRB266rqHbrM9IHS4+gdyUwLw7Y5ZKBu5edZ0lPN1HcjA/6nKAOSv2JVclM6fTt+obmBxEeQwnsDgSM+nCAKnrHQN00hbKCtuksG9WcOQYcuidu5IJ5uHNwJQBVYYJqmdkNPE+WWQ4Yxjd5zj1ABAGmae2KX+5U4nu1RBaYyMhsnyknraDges5QBLM2Q6amn8Eg1tSyVY/umuiLv8ApDsoAg9U7GtRWWndU298d1p2DLhA0tkA69w8/qJPYgDPKOlkqq2GkZhsk0jYm75wA4nHFAGkN2Hare0FtTaSCOiof/oQBWdZaCv+kBFJdYI308vBtTTuL4976pJAIPpHHo6UAcej9LV+rLlJQWySnjmjiMxdUvLW4BAxkA8cuQBcTsO1Xu7xqbTjr8If/oQBEU2zG+1OoayxRz28VdHE2WRzpnbhDubB3c59SAJcbDNWH/3Fq9u//QgCs6z0PddGOo23aSkearf3PB5C7G7jOcgY+cEASemtleoNS2eG526a3tp5c7ommcHjBxxAaepAD962Q6jslrq7lWVFs5GlidK9rJ3bxAHQC0cUAZ8cIASgC+bGPppS/eHvT6Xyy6Aep0gCua/G9pSuA+qPetmA7QjLjJaaTfQ8pvGSuxUgXuMPbxWOcSUxojnWWcRiZ6q2fvorrs8oYbdNyLDSmBxhID4X4wf/ANDnWKSsyxnlw2C1Ekz5KXUDXlxJJqISXH0nKgCLj2Sa40/U+GWGugdMziDTzmNx6hgjB9ZQBybXtUV12t9qtV5tFTb7pS+XUGVoDJHFuCWdYz2lAFh/J205TSx12oaiMPmjl8Gp94cGcAXOHb5QHqKAOPb3q6uddRpyknfFSRxh1SGHHKud+iT1AdCAMbGCQgDf9gmr626xVVjudQ+d9M0SU8khy7d6QTznCAKxt+03T2i+U12ooxEy4B3LNbwAlbjyh6Qf3IAsX5OE0jrTfd973hk0ZAJzjyXfBAF/sd9seurVWUpbHNul0VXRy4LmYJHEdRxwKAML2obOqvSFQbjbOVktEjsCQZJgJPBrj1dRQBoF5lkk/J8ikL3Fxo4suJ4/PCAPP3KvB+e8HrDigDatjO0ncfFp2/VBLXHdo6mV3EHoY4n93cgCY2y7OZb5/XljhL7g3DZ4Gn+3bzBw/WH7wEALoIbXsc0Y+prXNnvNaANwHjI8czR1Nbk5Pb2hAGEXu+199uM9wuU75Z5jk8SGtHUB0DsQBGk8MIAJAF82MfTSm+8PenUvll0A9TpIFe10M6YrB1tHvW3L+0RMWYO1BvoeVXj8V6CcS6Yw5vFY5wLjZaM8RlZ5QLJmvWTSd1tez6l1Jouvr47rKwSVFOx4cyRvHOGEYJHDC5k/nsxiIWDbTrCjcYaplBK5jsOE1OWv9BwRg+pDpruC5ZNP7cKytudLR1tjjd4RI2Pep5SXAk4+aRx70pxsSWLb1SUc+g5KmdjfCIJ4zA4/OBJwQPVngoAgPydL7T+BXGwTPDajlfCYWk432kAOA9G6D60AQm37TNXT35t/iie+iqWNZI8DhE8cAD1ZQBkYHHnQBuv5Pemauk8Kv9ZE6KKeMRUwcMF4zku9HMgCI/KHv1PXXmis9M9r3ULXPqCOOHuxhvpA5/SgCY/Jw/3TqDGf7SLjj9VykDJ4L3X6f1VPcbVUOiqYamTjzh43jlrh0gqAPRuhNcWnXlrfTzRxsrDGW1VDJghzTwJAPzmlAHNtNttLadlFzoKCPcpoI2iNmc7o5QHHo4oA8ukKbAKBxgjhgc4UAeq9kN1rLzoO31dxm5aoBfGZCOLg1xaM9ZxhAGBbWLnV3LXNz8LmMjaeUwwt6I2DoA70AU5AAQAEAXzYz9NKX7w96dS+WXQlHqYJJBBa1bv6dqWjpwP3rbl3aInPzR2wsmeWJ4yyR7COLCWn0hemktxaLutxzuCzTiNQ25vo9azygWNCtW1q5WXTVBaLXboGS0mAaiaQvbI3jkFgAx6Q7oXPqYRSk3cYpEn/ALWLFdI8ao0dTVL+mSIMfvepwBHeUiWHkuDJuHFtX0xZw5+ndGRU9QeG9iOL97QSUvYy7yblC1pre9awqGOukkbIIjmKmhBEbD18TkntJRs7AQFHWVNBVRVdDNJBUQneZIx2C0qriSatYNuFa2nFLqW1RXBmN0zQ4Y5wx+k05aT6MehUcWA83aFs2ikFRFonE4OR/RYRg9fPhGlgcOpNtl3rqd9NYaKK2QkbvLF3KS47OhvcUaQMxiqpGVrKuQctIJRK7lDnfIOePpVtJNjUabbjX0rS2m07bYgcZDHOblV0sLFX1vryTV1HT08lnoaEwymXlKceU7gRg96lRCxV6Cvq7ZWw1tvnkp6mF29HIw4IKLBYvuodr121BpmostdbqQeERtZJPGXA5BByBzdCjSFjOMKbBYlNM3g2C809yFLDVciT8jMPJdkdKiwWNIh27XKCMRwaft0bBzNY5wA9SixFiu602lS6rtMlDNY6Clc+RsjqiLJfkdp60WAoaLAEoACALxsdONa0f3x706l8suheC4nqoJJQg9ZHFgqD2t9625f2heZzc17JI856zt7qG+zOA+Sqfloz6fnDv969NTleJly6uquHXNbmQDmqskdBMac1IlEvcQ4diRKJdMQ5vDikuBIghJlAuhJalOBIndVHAkItz0KukA8KNJNgsKNJNg8I0k2C3VGkmwMKNIWBhRpCwWEaQsDCiwWBuqpAktUAFhQFgsKCLBEIZAlVILvsg4a1ou14T6K+GXQZT4M9VhZ0LIPWfDT1T6W+9bsu7QvM5ua9kkZfqK1RXq3mHIZOzjE8jgHdR7Cu7CTg7nl8FiXhqmp8HxMrqYJaaZ0M7CyZhw5juBC17mro9XGSlFSi7p8HzGHNS5IZEQWpTiMQgtSHAuILepKcSwktS3AtYLdVHAmwW6qaC1gt1RoJsDdVdJNgbqjSTYG6o0k2C3VGkLA3VGkmwN1VaCwRaqtEWCwo0hYLCq0RYIhUaIsJLepQVEkKGgsEQqkWLjsjdu64t465QtFH5Z9BlJbpdD1cFmEkHrP6PVHpb71ty7tC8znZr2WRmwm45yu9beeVVPcR97stJfIt6Q8lUt4MmA4+g9YRGTg9w/DYmphXpW9GfXe0Vlpl3KyPDT82VvFp9B/BaFJSPRYfE066vB7+RHOHBDibEIISnEugsJbgWQW6lOBZBbio4FrBbqpoLWC3VXQWsDdVdBNgt1V0lrA3VDiTYBaquIWC3VWwWBuqHEmwktVGiLBFqo0Fgi1VaIsJIVWiLBYVGithJGVBWwgjCq0VLdsn+nNt/wAUfin0fln0/I6l8sun5PV4WUzEHrX6PVPq9625d2heZzs07LIyQzYyD1r0TOGqd0h2OfGFFirpXHzM2aMxyND2O4FruIPpCjTbgK2Ti7rcyv3HSlvqXF9G40rz+i3ym93QrqUkdGjj69PdNXX3K7W6YuNLktjE7R0xn8FbUmdSljqM++xDyxPiduzMdG79cYUOJui01dCSzCo4jEFuqjiXC3VRxLWC3VVxLpA3VRxJSBuqriWsDdVXELA3VWxNgt1UsTYItVWgsFuqjQWCLVRoLCS1UsVsJLVRoiwghVaK2EkKjRVoSW5VBbRbNlAxrm2/4oTafyy6DaK+GfT8nq4LKjKQOtfo7Ver3rdl3aF5nOzTssjFHS8V6MwKAbZ+KCdmOtqcK6ROyuLFXjpwp0kqgKFVnpyrKJZYcTK6KZu7NGx7epwVtI6FFx4Mj57NbJ+IphGeuM7vuRoRvpOouLOCXTMBOYqiRv3mh3wUbJGyN2cz9Mz/AN1NE77wIVHR/U0Km3wOd2nbi35sbHeh6W6TLqjPkMvstxYCXUknDqGUt03yLbGfI5nUc7Pn08oPawqjhYND70NFmOB4elUcQtYLcVHELALMJbRNhO6qNBYSWqjQWCLeCW0FhJaqNEWElqq0RYSWpbRFhstVGUcRJaqMW4lq2VDGubb/AIoVocJdC9NfBPp+T1WFnMRBa1ONO1R9HvW3Lu0I5+Z9ml5GBmoyvSClAIToJUQ+XwmRGxgH4R2plh0adxQqcK9hypChUqbF1TFtqEWHRpjrZ+1Fh8YDrJlBpjE6I5gq2NEUzpjl5uKq0aIJnQ2ZhGHKriOSYCymkGHwxOHawFUdP9C2hPihh9ntUvzqGHPWG4VHTT4oHQpvijll0taZPmxPj+68pbpRKPC0mckuiaUj5CrlYf12hw/BJlSiLeDj3Mj6jRNczJp6iCQdTstP4+9KlS5MU8HNcGRVVp260/F9FI5o/Sjw4fuSZU2hTw9RdxFywvjduyMcw9ThhJaFONuI0WqjRWwgtS2gsILUtlWhBaqMW0WnZaMa4tn+KFMeEuhKXwT6flHqgLOc4gNcHGmqs9g9625d2hGHMVfDtdDziKjn4r0OoY4B8t2ouRoD5bgmRYyMQct2pqZpjEPl0xMcoi2z9qsXSFtmKkbFDzJkXGpHRHN2qB0UdEc3aoNEYnSyXtQOiPseefKiw1CzUNYMuKh2XEtqSGX3NreDeKROqluRXahC4nPOVmlUDXc6YK/e5yUiUy6ZIQ1AdjikuoyxIUzg4gjo7VV1GQx2ehpaxu5VQRyj9ZoKpJrvFySfFEFX6BtlXl1I59K8/V4t7is06ljLUowfApl80Vd7S10vI+FUw55YBnA7W84VNpFszODRWi1DKWEObgJbKuJZ9mDfz3th/wDtCqnuZVq0J9D1KEk5ZX9eHGlq09g9625d2heZmxSvSaPMIlK66mPcdwoTdqYpFbCuW7UxMukDle1OjIdEUJCmKQxOwoSY5yrKRdSuONmH1grXYxMeZMMgbwRdj4nTHIi5oidUTyrDosfFQ2MZceboUNpcS2pIYmuR4howkzrpbkUlVscclY5x4uJWOdRsW6jYgVKS5E6mOx1Bz1JbkXjI7IKg5HFLvcepEzaW1NbMIqWF8r+cgdA7epY8ViqOGi51ZJIbrUVeRc6LT9c1gMxiaccwcV56XtXl8XZXfkIeMprgJmjfTTGKXG8Oorr4fHU8XRVWnwY2MlUjqQ7DLlROZWUDshkxjPQsc5iJQIHUuh7bfmOmpmto648RKwYa8/rD8UuGLlT3cUZZRtvMeu9prLRWPo7hCYpmn1OH1gekLoxqRqR1RKreTmzCMnWlux0SAlUnKxEl/wAc+h6fCqccru0A40pXH9Ue9bsu7QvMTXV4WPLBk4LapbzRYTyhTlILChIetNUiUhXKFMUy6YsSFM1lkWTZ42Oo1pao5mNewynLXjIPknoXPzao44Ob6f5ReKPQUlDbWjDaClH/ACm/BeHq1o7/AN3+5aClzKFtXp6SLT8D4KWGN3hbBljADzO6vQun7N13LMNN92lv7x/U0wTXEy5kgAyTwXvtVldjlKwbqwjmVJVQdQ5pKreOclZp1Gyjmxh05J50hyI1BcqUtyJuKEh60tsumPxyHrS2xiZIW+OatqoaWnGZZXhrR1Hr7lnr140KcqsuCW8bF95tVgtbLbRMpqCAnh5cm7xe7pJK+ZYqWLzSrtWm+XLyM1WSe+bJOoM1JA+epYWRsGXOJykSybE3WqNr7hUHCpLTB3ZR5a51TUSTOPF7s+gdS99h6ccPRVKKskd2nTUIpIfhlx0qs5kSR3RS56VjnMVKJ3wSc2Ssk5mScTi1Xp2m1Na3QvDW1UYJp5scWnq9B6VWhi3QldGVpozXZrSy0ut4IJ2FksEm69p6DnBXcqzUtLXey0/pS6HpEJpxCt7QzjSNef1R71uy3fiV5lZK6PKRetCY0LeTFIBQcr6wFByspkit5X1k3LNs4djWtqPVI4/wlc3Oqn8hPy/yhtJ3lY3uap5/ivm9bEnRjTKFtWqXeIIB0Gsaf4Xru+yNbVmEn/a/u1+xNZaIplK0hYo9RyVTJKt1OIA04awO3s56/QvUZ5nkssjBwhq1X8hdKDqXsyyf7OKM890qfVC34rzT9taz4UV6v9hjwsuZT9ZWRmnbhDTRVL52Sw8oHPbukcSMcPQvR5TmjzGi6so2adjNU+CWkr++ui5FVIUHqmoupC2vVXIYmPRvS3IYmaNsqtQkqJbrOwua35KFvW4/OP4d68x7QYyKthuN97S+xLbsa5B4TgbsRA6BnmWCj7zbdAxTVO+9lU2gXt8EUdra4iaXy5RnmYObvPuXRwrqNvabrG/LqEdTq93cU+CbPStUp2O5YkIZe1ZJTIcTvgm4c6yVJCnEkIJebisU5O5nlAkYJubisspGSpAhBamRbQ6O5RNAFXHuyYH6bCOPrBHcupgMRqjGm3wf7iJK1KfQ1Icy9CcQrO0g7ujrgf1R71uyztMQPJ5PE+lX1FrgyrKQXD3lbUFwwVZSBMUHK2sksmzx/wCeVt7HO/lK5meS/wDH1P8Ae8fh99VI3Bzy5fKW2zvKKRSNqzsWCD9oHuK9Z7IO2Mm/7fyZMd9NdfwykaSul3t81Q6zUnhJe0CQbud1erzfDYPExj71K1uBjoVKkb6FctDNTayHDxDvHtjPxXn3lOT/APt+6/Ye6+J8H2KjrG5XO43Nkl4pPBJ2RBjYt0t8nJ48V3croYbD0XHDy1K5lqSnKV5qzIEOXS1FUxQcquRdMUHKrYxM6aOOWqqYqeAF0srwxjR0k8EqpVjCLlLgt/oNTPQdhhp7JbaehgAzCwBzx0u6T3r5vUzLXXlWtvb+w7YtreTHjZsbHSSPw1rS5x6gFqo5jKUklxYmWGMZu15feLzVV73H5Z/kg9DAMNHd+K9PG8YJPidPDxVOmoodppu1JnI3RdyShmz0rLJsYd0EwGOKzTuyrR3wVA61kmhEkSEFSBjiskzPKBIUD2zXGj4AlsoIPUm4GVsVDqZa8dNKXQvQXtDzpVdp5LdEXJw5wwe9bss7TH/e4lcTyfniVW4XDypuQDeVrkg3lKYBgqdQXLHs+cRrC24+u7+UrnZw74Cp0NOF31om5ZXzFI9AikbWnEWCnx5y0fwuXqPZbdipdPyYcxdqK6/hkTshP9JuX3Wfiuh7VO9On5isu4y8jSsrxljqmT7WXf19SdP9FH8xXuvZxv3WS/U42P3Vic0BonT9901DXVvLS1LnvbIGSlu4QTgYHZg+tZM2znF4TFOnBfD3CqNGNSN3xOq9bKaJ8b32Wqmgl/RjnO8w+vnCThvad6kq8d36DXhml8JmFxoam11ktHXRGKeI4c0+8dYXp4V4VYKcHdCk2nZly2WWk1Fwlu0oHJUnkRZ6ZCOcege9cL2gxejD7GL3y49DXh465XZqIcvEuO86RWNod3FDaG0kbsTVh3eB4hg5z+C7eSYRzq7VrdETOSvYzuGfBXqJDISJKnqh1rNJGqEiRhqh1rPK49SOyKrHWkSQXOyKrHWs04lWdsVX2pMoC3EndN1HKXWnGf0gjDQtiafX8GPGRtQl0NKbzL2B5cqW1Q40Lc8fVHvW3Lt2JiWjxPKGeJSrlQZU3AAKnUAeUXAAKm4Fk2d8dZW7P1nfylc7N3/JTNOE+tE3LK+dJHoyjbXT/UFN+1N/lcvSezW7Ey6fk52Z/Rj1/DInY+fl7n91n4rd7Tb4U/MTle9y8jSyeK8jY7BlG1s4vtGf+F/zFe19n3bDS6nDzD6x0bH774FeZLVM/ENaPIBPNIObvGVXP8H7xQVRcY/4EYaemdn3myPcD2rwqOukUjajYfG1nbXU0e/W0ZGABxfGTxHq5+9d/IsdsKuym/hf2ZmxNL4dUVvO7TlubZ7JS0I+cxu9Iet54lZ8wxEsTXc3wNuHpbOHUlGu3nboIBPSeYLEoNuy4jm0lcxnVl7F6vtRUxO3qZnyVP8Acaef18T617TCUPd6KgvPqc3aOUrkcyXB509j41Drinx0pLRpjUOyKq7UmUTTGZ2RVXakuAxSOyKq4c6W4FrnZFV9qVKBJZtFVHKX2nbnpCijC1em/wBTHj+zy6GvjmXpTyRUNq/0Duf3R71rwH14l4cTygecpNygSm4Ayi4BgqbgDKLgWbZufzzt/pf/AClc7Nn/ACUzRhPrI3EleBS3HpCjbXT+blMf+LaP4XfBeh9nd2Il0/KOdmf0l1/DInY9xluh7Ix373wWz2hd4U11E5Xxl5Gl5Xl7HYMp2v8AC90P7L/mK9dkPZ5dTg5i/wDmKRTVM1NURVEDyyWJ4exwPMR0rtSSlFxfeYr956P09eI77ZKS5xcOXZ5bPqPHBw7wvnWY4V4bESh3dx28PPaQudxdunKwp23mjTdEdO3k5S3o5x6Fvj8SuPg7orOvLx4q0/KyN27UVYMEeDghp+ce7h610ssw+1r6nwjvMmNqaYaeZkDXL07RzlIda9UsMjMfZIoaNEZj8cqW0aI1Tpjn7SqOJojUudcdRw5yluI5SOuOo7UpxGJlt2fTb2pKYdoS1G1WHUz43fh5dDcm8y7x5EqG1f6B3L7o9614H68S9P5jyefnFZyoSLkARcAIuAFNwLNs2+mdu9L/AOQrn5p2Of8AveacJ9ZG4nnXhkj0hSdrn0Ui/b4/5JF3Mh3YmX/z+Uc3M/poi9jf9jePvQe5615/vVPz/ArK/mkaMSvO2OwZTtgP9d0X7L/mK9XkbtQl1ODmP1ihgrtXOeaXsdvvI1VTY53YbUHloM8weBgj1jHrC8/n2F2tHarjE3YKqoy0s1QuXi2dtIThsnB7A4dvR602nOUdyIe7fcxHaJe2XfUsgpQBS0vyMeDwcR853rPuXu8Bh9jQS72cStUdSoysA9S2NFExxrlRoamPNcqsYmPMcqj4yHmOVGh8ZHQyRUaNEZHVFIqND1IuGziT86aQfrJLX/JDqLxW/Dz6G/hdk8mVraJQyXDRl0ghaXSckXgY58cfctGEko14tl4O0keRpGlr3NIwQUupFwk4sq1Z2EKhAEABAAQBKabu3iS801xEQl5En5MnG9kEc/rSMTR29KVO9rjKVR05KS7i+HavB/8ADO/7j/wuL/Af7/sdD+Jz5EHrDXDNR2uOhZQeDNbO2Yu5XeJwHDH8S24HLVhKjnqvdW/w/wAGbEYt14pNHJovVg0z4Y19IKllTuEgSbhaW5x/Mm47ArFqPxWtcrh8RKg24lmG1aDP+5nf9x/4XO/gf9/2Nf8AFJ8in6w1F/6kr46kU4p2RRCNrN/ePOTnPrXVwWF91p6L3MOIrutPUyAC2CR2nmfBK2WJ7o5GHLHtOC09ahpNWfAE7Gg2varWwwCO50cdW9oxyrHbjj6eGFwsRkNGpLVCWk3U8fOCs95x6g2kXG60r6SjibQwyDD3McS9w6s9HqTsJk9HDy1v4mVq4ypVVuBS88V1hCYYKgsmLaVVl0x5pVGNTHWlUGpjzCoHRY8xyo0aIyH2PVGh8ZF52UUr6rVED2g7sflOOOgKNF6sELxdTTh5M9ADmXRPNAcA5pBGQRxBQB5/2m7Kqylq5blYKd89I8lzoYxl8R6sc5HVjit+uGJXxO0+fP8A7GbpGTy0NVG5zXwvBacEY6UqWDr+H0DZy5DfgtR9k/uVfdK6/pZGynyD8EqPsX9yj3Wt4WTsp8geCVH2L+5Hu1bwsNjU5A8EqPsX9yPdq3hZOxqcgeCVH2L+5R7vV8IbGp4QeCVH2L+5RsKnhDYVPCDwSp+xf3I2FTwhsKnhB4JU/Yv7kbCp4Q2FTwg8EqfsX9yNhU8IbCp4QeCVP2L+5GxqeENhU8IPBKn7F/cp2NXwhsKnhB4JU/Yv7kbGp4Q2FTwhilqfsX9yjY1PCTsavhFeC1H2L+5GxqeEtsavhD8HqB/cv7kbKfIFRq+EcbS1GM8i/uVJQaGKjV8I+2kqPsXpLiOVKfIcbTT/AGTu5LaGqlU5Djaaf7J/cofAbGlU5Draef7J/cqXXeNVKpyJWz2G6XapZBQ0ksj3fVHAD08w9ahSj/TvY1rQr1HZG/aB0jHpmgdym6+slHluHM0fVHxTqNJxblLfJnGxmL27UY/KvuWwJ5iP/9k=",
  },
];

interface GuideItem {
  id: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  steps: number;
  platform: string;
}

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlatform, setActivePlatform] = useState("all");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [guides, setGuides] = useState<GuideItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      
      if (results.Response === "False") {
        setError(results.Error || "No results found");
      }
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Map search results to guide format
  useEffect(() => {
    if (searchResults?.Search) {
      const newGuides = searchResults.Search.map((movie) => {
        // Randomly assign a platform to each movie
        const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
        
        return {
          id: movie.imdbID,
          title: `How to Download ${movie.Title} from ${randomPlatform.name}`,
          thumbnail: movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Poster",
          excerpt: `Learn how to legally download ${movie.Title} (${movie.Year}) for offline viewing with this step-by-step guide.`,
          steps: Math.floor(Math.random() * 3) + 4, // Random number of steps between 4-6
          platform: randomPlatform.id,
        };
      });
      
      setGuides(newGuides);
    }
  }, [searchResults]);

  // Load initial data
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      try {
        // Popular movies for initial display
        const results = await searchMovies("marvel");
        setSearchResults(results);
        
        if (results.Response === "False") {
          setError(results.Error || "No results found");
        }
      } catch (err) {
        setError("Failed to load initial data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    initialLoad();
  }, []);

  // Filter guides by platform
  const filteredGuides = activePlatform === "all" 
    ? guides 
    : guides.filter(guide => guide.platform === activePlatform);

  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Movie Download Guides" 
              subtitle="Step-by-step tutorials to help you legally download content from popular streaming platforms"
            />
            
            {/* Search bar */}
            <div className="mb-8">
              <div className="flex gap-2 max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for a movie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full"
                />
                <button 
                  onClick={handleSearch}
                  className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span>Search</span>
                </button>
              </div>
              
              {error && (
                <p className="text-destructive text-sm mt-2 text-center">{error}</p>
              )}
            </div>
            
            {/* Platform filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button 
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  activePlatform === "all" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-white transition-colors"
                }`}
                onClick={() => setActivePlatform("all")}
              >
                All Platforms
              </button>
              
              {platforms.map(platform => (
                <button 
                  key={platform.id}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                    activePlatform === platform.id ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-white transition-colors"
                  }`}
                  onClick={() => setActivePlatform(platform.id)}
                >
                  <img 
                    src={platform.logo} 
                    alt={platform.name} 
                    className="w-4 h-4 object-contain"
                  />
                  {platform.name}
                </button>
              ))}
            </div>
            
            {loading && guides.length === 0 ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {filteredGuides.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredGuides.map((guide) => (
                      <Link to={`/movie/${guide.id}`} key={guide.id}>
                        <div className="bg-card rounded-lg overflow-hidden border border-border/50 hover-scale hover:shadow-lg transition-all duration-300">
                          <div className="aspect-video relative">
                            <img 
                              src={guide.thumbnail} 
                              alt={guide.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full py-1 px-3 text-xs font-medium flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>100% Legal</span>
                            </div>
                          </div>
                          
                          <div className="p-5">
                            <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{guide.excerpt}</p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-3 py-1">
                                {guide.steps} steps
                              </span>
                              
                              <span className="text-primary flex items-center gap-1 text-sm font-medium">
                                Read guide <ArrowRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No guides found. Try searching for a different movie.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default Guides;
